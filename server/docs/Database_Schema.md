# Database Schema

## Entity Relationship Diagram (ERD)

- Refer to `Designs/ERD_Diagram.png` for visual representation.

## Collections and Fields

### User Collection

- **_id**: ObjectId (Primary Key)
- **username**: String (Unique, Required, Min 3 characters)
- **email**: String (Unique, Required, Email format)
- **password**: String (Required, Min 6 characters, Hashed with bcrypt)
- **createdAt**: Date (Auto-managed)
- **updatedAt**: Date (Auto-managed)

### Task Collection

- **_id**: ObjectId (Primary Key)
- **title**: String (Required)
- **description**: String (Optional)
- **status**: String (Enum: pending, in progress, completed, Default: pending)
- **user**: ObjectId (Foreign Key referencing User._id, Required)
- **createdAt**: Date (Auto-managed)
- **updatedAt**: Date (Auto-managed)

## Relationships

- **One-to-Many**: One User can have multiple Tasks (via `user` field in Task).
