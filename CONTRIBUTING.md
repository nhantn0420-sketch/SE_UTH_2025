# Contributing to CollabSphere

Thank you for your interest in contributing to CollabSphere! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker and Docker Compose (optional)
- Git

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SE_UTH_2025.git
   cd SE_UTH_2025
   ```

2. **Backend Setup**
   ```bash
   cd collabsphere/backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd collabsphere/frontend
   npm install
   ```

4. **Run Development Servers**
   ```bash
   # Backend (from backend/ directory)
   uvicorn app.main:app --reload --port 8000
   
   # Frontend (from frontend/ directory)
   npm start
   ```

## Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow the coding standards
   - Add tests for new features
   - Update documentation

3. **Test Your Changes**
   ```bash
   # Backend tests
   pytest
   
   # Frontend tests
   npm test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Coding Standards

### Python (Backend)

- **Style Guide**: Follow PEP 8
- **Type Hints**: Use type hints for function parameters and return values
- **Docstrings**: Use Google-style docstrings
- **Imports**: Group imports (standard library, third-party, local)
- **Line Length**: Max 88 characters (Black formatter)

Example:
```python
from typing import List, Optional
from sqlmodel import Session

def get_user_projects(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Project]:
    """
    Retrieve projects for a specific user.
    
    Args:
        db: Database session
        user_id: ID of the user
        skip: Number of records to skip
        limit: Maximum number of records to return
        
    Returns:
        List of Project objects
    """
    query = select(Project).where(Project.user_id == user_id)
    return db.exec(query.offset(skip).limit(limit)).all()
```

### JavaScript/React (Frontend)

- **Style Guide**: Use ESLint with Airbnb config
- **Components**: Use functional components with hooks
- **Naming**: 
  - Components: PascalCase (e.g., `UserProfile`)
  - Files: PascalCase for components, camelCase for utilities
  - Functions: camelCase (e.g., `handleSubmit`)
- **Props**: Use PropTypes or TypeScript interfaces
- **State**: Use Context API for global state, local state for component-specific

Example:
```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

/**
 * Displays user profile information
 * @param {Object} props - Component props
 * @param {number} props.userId - ID of the user to display
 */
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4">{user.full_name}</Typography>
      <Typography>{user.email}</Typography>
    </Box>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserProfile;
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD changes

### Examples
```bash
feat(auth): add password reset functionality

fix(projects): resolve null pointer in task creation

docs(api): update authentication endpoints documentation

refactor(groups): simplify group member management logic

test(notifications): add unit tests for notification service
```

## Pull Request Process

1. **Before Submitting**
   - Ensure all tests pass
   - Update documentation
   - Add/update tests for your changes
   - Run linters and fix issues
   - Rebase on latest main branch

2. **PR Title**: Follow commit message format
   ```
   feat(projects): add project template feature
   ```

3. **PR Description**: Use the template
   - Describe what changes were made
   - Link related issues (#123)
   - Include screenshots for UI changes
   - List breaking changes

4. **Review Process**
   - At least one approval required
   - All CI checks must pass
   - Address review comments
   - Squash commits if requested

5. **After Merge**
   - Delete your feature branch
   - Update your local main branch

## Testing

### Backend Testing
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_auth.py

# Run specific test
pytest tests/test_auth.py::test_login
```

### Frontend Testing
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test UserProfile.test.js
```

### Writing Tests

**Backend (pytest)**:
```python
def test_create_project(client, test_user_token):
    """Test project creation endpoint"""
    response = client.post(
        "/api/projects/",
        headers={"Authorization": f"Bearer {test_user_token}"},
        json={"name": "Test Project", "description": "Test"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Test Project"
```

**Frontend (Jest + React Testing Library)**:
```javascript
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders user profile', () => {
  render(<UserProfile userId={1} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

## Documentation

### Code Documentation
- Add docstrings/JSDoc comments to all public functions
- Explain complex logic with inline comments
- Update API documentation when adding/modifying endpoints

### User Documentation
- Update relevant docs in `docs/` folder
- Add screenshots for UI features
- Update README.md if needed
- Keep CHANGELOG.md updated

### API Documentation
- Backend API docs auto-generated at `/docs` (Swagger UI)
- Update OpenAPI schema if needed
- Document request/response examples

## Questions?

- Open an issue with the `question` label
- Join our discussions
- Contact maintainers at [project email]

## Recognition

Contributors will be recognized in:
- CHANGELOG.md for significant contributions
- README.md contributors section
- Release notes

Thank you for contributing to CollabSphere! 🚀
