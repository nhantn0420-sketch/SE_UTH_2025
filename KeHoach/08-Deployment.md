# Giai Đoạn 8: Deployment và Finalization

**Thời gian**: 1 tuần  
**Mục tiêu**: Deploy hệ thống lên cloud (Azure/AWS), configure production environment, và hoàn thiện documentation

## Nhiệm Vụ Chính

### 8.1. Dockerization

#### A. Backend Dockerfile

**`backend/Dockerfile`**:
```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY ./app ./app

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### B. Frontend Dockerfile

**`frontend/Dockerfile`**:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**`frontend/nginx.conf`**:
```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /socket.io {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

#### C. Docker Compose

**`docker-compose.yml`**:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: collabsphere
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://admin:${DB_PASSWORD}@postgres:5432/collabsphere
      REDIS_URL: redis://redis:6379
      SECRET_KEY: ${SECRET_KEY}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME}
      CLOUDINARY_API_KEY: ${CLOUDINARY_API_KEY}
      CLOUDINARY_API_SECRET: ${CLOUDINARY_API_SECRET}
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      REACT_APP_API_URL: http://backend:8000/api/v1

volumes:
  postgres_data:
  redis_data:
```

**Test locally**:
```bash
docker-compose up --build
```

### 8.2. Deploy Backend lên Azure

#### A. Azure Setup

**Install Azure CLI**:
```bash
# Windows
choco install azure-cli

# Mac
brew install azure-cli

# Login
az login
```

**Create resources**:
```bash
# Create resource group
az group create --name collabsphere-rg --location eastus

# Create PostgreSQL
az postgres flexible-server create \
  --resource-group collabsphere-rg \
  --name collabsphere-db \
  --location eastus \
  --admin-user adminuser \
  --admin-password <password> \
  --sku-name Standard_B1ms \
  --version 15

# Create App Service Plan
az appservice plan create \
  --name collabsphere-plan \
  --resource-group collabsphere-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group collabsphere-rg \
  --plan collabsphere-plan \
  --name collabsphere-backend \
  --deployment-container-image-name collabsphere-backend:latest
```

#### B. Configure Environment Variables

```bash
az webapp config appsettings set \
  --resource-group collabsphere-rg \
  --name collabsphere-backend \
  --settings \
    DATABASE_URL="postgresql://adminuser:<password>@collabsphere-db.postgres.database.azure.com:5432/collabsphere" \
    SECRET_KEY="<your-secret-key>" \
    AWS_ACCESS_KEY_ID="<your-aws-key>" \
    AWS_SECRET_ACCESS_KEY="<your-aws-secret>"
```

#### C. Deploy with GitHub Actions

**`.github/workflows/deploy.yml`**:
```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Build and push Docker image
        run: |
          cd backend
          docker build -t collabsphere-backend .
          docker tag collabsphere-backend collabsphere.azurecr.io/backend:latest
          docker push collabsphere.azurecr.io/backend:latest
      
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'collabsphere-backend'
          images: 'collabsphere.azurecr.io/backend:latest'
```

### 8.3. Deploy Frontend lên AWS/Cloudinary

#### A. AWS S3 + CloudFront

**Build frontend**:
```bash
cd frontend
npm run build
```

**Deploy to S3**:
```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure

# Create S3 bucket
aws s3 mb s3://collabsphere-frontend

# Upload build
aws s3 sync build/ s3://collabsphere-frontend --acl public-read

# Enable static website hosting
aws s3 website s3://collabsphere-frontend --index-document index.html --error-document index.html
```

**Create CloudFront distribution**:
```bash
aws cloudfront create-distribution \
  --origin-domain-name collabsphere-frontend.s3.amazonaws.com \
  --default-root-object index.html
```

#### B. Alternative: Deploy frontend to Azure

```bash
# Create static web app
az staticwebapp create \
  --name collabsphere-frontend \
  --resource-group collabsphere-rg \
  --source ./frontend \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "build"
```

### 8.4. Database Migration to Production

**Run migrations**:
```bash
# Connect to production database
export DATABASE_URL="postgresql://adminuser:<password>@collabsphere-db.postgres.database.azure.com:5432/collabsphere"

# Run Alembic migrations
cd backend
alembic upgrade head
```

**Seed initial data**:
```python
# scripts/seed_production.py
from sqlmodel import Session, create_engine
from app.models.user import User, UserRole
from app.utils.security import get_password_hash
from app.config import settings

engine = create_engine(settings.database_url)

with Session(engine) as session:
    # Create admin user
    admin = User(
        username="admin",
        email="admin@collabsphere.com",
        hashed_password=get_password_hash("admin123"),
        full_name="System Administrator",
        role=UserRole.ADMIN
    )
    session.add(admin)
    session.commit()
    print("Admin user created")
```

### 8.5. SSL/HTTPS Configuration

#### A. Azure App Service

```bash
# Azure manages SSL automatically for *.azurewebsites.net
# For custom domain:
az webapp config ssl create \
  --resource-group collabsphere-rg \
  --name collabsphere-backend \
  --hostname collabsphere.yourdomain.com
```

#### B. Let's Encrypt (for custom setup)

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d collabsphere.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 8.6. Monitoring và Logging

#### A. Azure Application Insights

```bash
# Enable Application Insights
az monitor app-insights component create \
  --app collabsphere-insights \
  --location eastus \
  --resource-group collabsphere-rg
```

**Add to backend**:
```python
# In app/main.py
from opencensus.ext.azure.log_exporter import AzureLogHandler
import logging

logger = logging.getLogger(__name__)
logger.addHandler(AzureLogHandler(
    connection_string='InstrumentationKey=<your-key>'
))

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"{request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response
```

#### B. CloudWatch (AWS)

```python
import boto3
import watchtower

cloudwatch = boto3.client('logs', region_name='us-east-1')
logger.addHandler(watchtower.CloudWatchLogHandler())
```

### 8.7. Backup Strategy

#### A. Database Backup

```bash
# Automated daily backups (Azure)
az postgres flexible-server backup create \
  --resource-group collabsphere-rg \
  --name collabsphere-db \
  --backup-name daily-backup-$(date +%Y%m%d)

# Manual backup
pg_dump -h collabsphere-db.postgres.database.azure.com \
  -U adminuser -d collabsphere > backup_$(date +%Y%m%d).sql
```

#### B. File Backup (Cloudinary)

```python
# Cloudinary has built-in versioning
# Configure in dashboard: Settings > Upload > Versioning
```

### 8.8. Production Environment Variables

**Create `.env.production`**:
```env
# Database
DATABASE_URL=postgresql://adminuser:password@collabsphere-db.postgres.database.azure.com:5432/collabsphere

# Security
SECRET_KEY=<generate-with-openssl-rand-hex-32>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# AWS
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-v2

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud>
CLOUDINARY_API_KEY=<your-key>
CLOUDINARY_API_SECRET=<your-secret>

# Redis (Azure Cache for Redis)
REDIS_URL=rediss://:password@collabsphere-cache.redis.cache.windows.net:6380

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@collabsphere.com
SMTP_PASSWORD=<app-password>

# Frontend URL
FRONTEND_URL=https://collabsphere.yourdomain.com

# Environment
ENVIRONMENT=production
DEBUG=False
```

### 8.9. Domain và DNS Setup

```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name collabsphere-backend \
  --resource-group collabsphere-rg \
  --hostname api.collabsphere.com

# DNS records (in domain registrar):
# A Record: @ -> Azure IP
# CNAME: www -> collabsphere-backend.azurewebsites.net
# CNAME: api -> collabsphere-backend.azurewebsites.net
```

### 8.10. Documentation

#### A. API Documentation

- Swagger UI đã tự động tạo tại `/docs`
- Export OpenAPI spec:
```bash
curl http://api.collabsphere.com/openapi.json > api-docs.json
```

#### B. User Manual

**`docs/UserManual.md`**:
```markdown
# CollabSphere User Manual

## For Students
1. Login với tài khoản được cung cấp
2. Xem nhóm được phân công trong "My Groups"
3. Truy cập workspace để collaborate
4. Sử dụng chat, video, whiteboard
5. Mark milestones khi hoàn thành
6. Submit checkpoints
7. Đánh giá peers

## For Lecturers
1. Tạo dự án mới
2. Sử dụng AI để generate milestones
3. Submit lên Head để approve
4. Tạo và quản lý groups
5. Track progress và contributions
6. Evaluate students

... (tiếp tục cho từng role)
```

#### C. Installation Guide

**`docs/Installation.md`**:
```markdown
# Installation Guide

## Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL 15
- Redis
- Docker (optional)

## Local Development
1. Clone repo: `git clone https://github.com/yourusername/collabsphere.git`
2. Backend setup: ... (chi tiết từ phase 2)
3. Frontend setup: ... (chi tiết từ phase 5)
4. Run: `docker-compose up`

## Production Deployment
... (chi tiết từ phase 8)
```

### 8.11. Final Checklist

#### Pre-deployment
- [ ] All tests passing (backend + frontend)
- [ ] Code coverage >80%
- [ ] No critical security vulnerabilities
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Backup strategy in place

#### Deployment
- [ ] Backend deployed to Azure
- [ ] Frontend deployed to AWS/Azure
- [ ] Database migrated
- [ ] SSL certificates configured
- [ ] DNS records updated
- [ ] Monitoring enabled
- [ ] Logging configured

#### Post-deployment
- [ ] Smoke tests passed
- [ ] All endpoints accessible
- [ ] Real-time features working
- [ ] AI features responding
- [ ] Email notifications sending
- [ ] Performance acceptable (<3s page load)

#### Documentation
- [ ] API documentation complete
- [ ] User manual written
- [ ] Installation guide ready
- [ ] Architecture diagram finalized
- [ ] SRS document updated

## Deliverables Giai Đoạn 8

- [ ] Dockerized application (backend + frontend)
- [ ] Production deployment on Azure/AWS
- [ ] HTTPS enabled với SSL certificates
- [ ] Monitoring và logging setup
- [ ] Automated backup system
- [ ] Complete documentation package
- [ ] Production URL accessible
- [ ] Admin credentials delivered

## Cost Estimation

### Monthly Costs (Production)
- **Azure App Service (B1)**: $13/month
- **Azure PostgreSQL (B1ms)**: $12/month
- **Azure Cache for Redis (Basic)**: $16/month
- **AWS S3 + CloudFront**: $5/month
- **Cloudinary (Free tier)**: $0
- **AWS Bedrock usage**: $50/month (estimated)
- **Domain + SSL**: $12/year

**Total**: ~$100-150/month

### Optimization Tips
- Use Azure free credits (students)
- Leverage AWS free tier (12 months)
- Optimize AI usage (cache responses)
- Use CDN for static assets

## Next Steps

Chuyển sang `09-CauHoiCanXemXet.md` để review các considerations quan trọng.
