# ⚠️ VẤN ĐỀ FRONTEND-BACKEND MISMATCH ĐÃ PHÁT HIỆN

## 🔴 VẤN ĐỀ NGHIÊM TRỌNG

### 1. **MILESTONE UPDATE API**
**Frontend**: `projectService.js`
```javascript
async updateMilestone(projectId, milestoneId, milestoneData) {
    const response = await api.patch(`/projects/milestones/${milestoneId}`, null, { params: milestoneData });
    return response.data;
}
```

**Backend**: `projects.py`
```python
@router.patch("/milestones/{milestone_id}")
async def update_milestone(
    milestone_id: int,
    title: Optional[str] = None,
    description: Optional[str] = None,
    week_number: Optional[int] = None,
    deliverables: Optional[str] = None,
    ...
):
```

❌ **MISMATCH**: 
- Frontend gửi `milestoneData` as query params
- Backend nhận as function parameters (form data)
- **CẦN SỬA**: Backend nên nhận JSON body như milestone create

---

### 2. **GROUP MEMBERS API**
**Frontend**: `groupService.js`
```javascript
async addMember(groupId, userId, role = 'member') {
    const response = await api.post(`/groups/${groupId}/members?user_id=${userId}&role=${role}`);
    return response.data;
}
```

**Backend**: `groups.py`
```python
@router.post("/{group_id}/members", response_model=ResponseMessage)
async def add_group_member(
    group_id: int,
    user_id: int,  # Query parameter
    role: GroupRole = GroupRole.MEMBER,  # Query parameter
    ...
):
```

✅ **MATCH**: Cả hai đều dùng query parameters

---

### 3. **PROJECT REJECTION**
**Frontend**: `projectService.js`
```javascript
async rejectProject(projectId, reason) {
    const response = await api.post(`/projects/${projectId}/reject?reason=${encodeURIComponent(reason)}`);
    return response.data;
}
```

**Backend**: `projects.py`
```python
@router.post("/{project_id}/reject", response_model=ResponseMessage)
async def reject_project(
    project_id: int,
    reason: str = Query(..., min_length=10),  # Query parameter
    ...
):
```

✅ **MATCH**: Cả hai đều dùng query parameter

---

### 4. **AI MILESTONE GENERATION**
**Frontend**: `projectService.js`
```javascript
async generateMilestones(projectId) {
    const response = await api.post(`/projects/${projectId}/milestones/generate`);
    return response.data;
}
```

**Backend**: Không có endpoint `/projects/{id}/milestones/generate`
Có endpoint: `/ai/projects/{project_id}/generate-milestones` trong `ai.py`

❌ **MISMATCH PATH**: 
- Frontend: `/projects/{id}/milestones/generate`
- Backend: `/ai/projects/{id}/generate-milestones`
- **CẦN SỬA**: Frontend hoặc thêm alias trong backend

---

## 🟡 CÁC VẤN ĐỀ KHÁC

### 5. **MILESTONE QUESTIONS**
**Frontend**: `projectService.js`
```javascript
async getMilestoneQuestions(projectId, milestoneId) {
    const response = await api.get(`/projects/${projectId}/milestones/${milestoneId}/questions`);
    return response.data;
}
```

**Backend**: Không có endpoint này trong `projects.py`
Có endpoint: `/groups/{group_id}/milestones/{milestone_id}/questions` trong `groups.py`

❌ **MISMATCH**: 
- Frontend tìm trong projects
- Backend chỉ có trong groups
- **CẦN XÁC NHẬN**: Questions thuộc về project hay group?

---

### 6. **UPDATE MEMBER ROLE**
**Frontend**: `groupService.js`
```javascript
async updateMemberRole(groupId, userId, role) {
    const response = await api.patch(`/groups/${groupId}/members/${userId}/role?role=${role}`);
    return response.data;
}
```

**Backend**: `groups.py`
```python
@router.patch("/{group_id}/members/{user_id}/role", response_model=ResponseMessage)
async def update_member_role(
    group_id: int,
    user_id: int,
    role: GroupRole,  # Query parameter
    ...
):
```

✅ **MATCH**: Cả hai đều dùng query parameter

---

## 📝 DANH SÁCH CẦN SỬA NGAY

### 🔴 PRIORITY 1 - CRITICAL (Backend)

1. **Sửa Milestone Update API**
   - File: `backend/app/routers/projects.py`
   - Endpoint: `PATCH /milestones/{milestone_id}`
   - Action: Thay form params bằng JSON body (tạo `MilestoneUpdate` schema)

2. **Thêm AI Milestone Generate Alias**
   - File: `backend/app/routers/projects.py`
   - Action: Thêm endpoint `/projects/{id}/milestones/generate` redirect đến AI service

3. **Xác nhận Milestone Questions**
   - Quyết định: Questions thuộc Project hay Group?
   - Nếu Project: Thêm vào `projects.py`
   - Nếu Group: Sửa frontend path

### 🟡 PRIORITY 2 - IMPORTANT (Cần kiểm tra thêm)

4. Kiểm tra tất cả endpoints trong `groupService.js`
5. Kiểm tra tất cả endpoints trong `classService.js`
6. Kiểm tra tất cả endpoints trong `evaluationService.js`

---

## ✅ ĐÃ SỬA (Session này)

1. ✅ **Milestone Create API** - Đã thêm `MilestoneCreate` schema, nhận JSON body

