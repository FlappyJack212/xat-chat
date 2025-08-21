# Unified Architecture Diagram for Xat Recreation

## System Architecture Overview

```mermaid
graph TD
    subgraph Client
        UI[User Interface Layer]
        Logic[Application Logic Layer]
        Comm[Communication Layer]
    end
    
    subgraph Server
        API[API Layer]
        Business[Business Logic Layer]
        Data[Data Access Layer]
        DB[(Database)]
    end
    
    UI --> Logic
    Logic --> Comm
    Comm <--> API
    API --> Business
    Business --> Data
    Data --> DB
```

## Client-Side Architecture

```mermaid
graph TD
    subgraph "User Interface Layer"
        ChatUI[Chat Interface]
        UserListUI[User List]
        AvatarUI[Avatar Display]
        PowersUI[Powers Interface]
        RoomUI[Room Customization]
        SoundUI[Sound Controls]
        ProfileUI[User Profile]
    end
    
    subgraph "Application Logic Layer"
        ChatManager[Chat Manager]
        UserManager[User Manager]
        AvatarManager[Avatar Manager]
        PowersManager[Powers Manager]
        RoomManager[Room Manager]
        SoundManager[Sound Manager]
        ProfileManager[Profile Manager]
    end
    
    subgraph "Communication Layer"
        WebSocket[WebSocket Client]
        RESTClient[REST API Client]
        EventBus[Event Bus]
    end
    
    ChatUI --> ChatManager
    UserListUI --> UserManager
    AvatarUI --> AvatarManager
    PowersUI --> PowersManager
    RoomUI --> RoomManager
    SoundUI --> SoundManager
    ProfileUI --> ProfileManager
    
    ChatManager --> EventBus
    UserManager --> EventBus
    AvatarManager --> EventBus
    PowersManager --> EventBus
    RoomManager --> EventBus
    SoundManager --> EventBus
    ProfileManager --> EventBus
    
    EventBus --> WebSocket
    EventBus --> RESTClient
    
    WebSocket --> Server
    RESTClient --> Server
```

## Server-Side Architecture

```mermaid
graph TD
    subgraph "API Layer"
        WSHandler[WebSocket Handler]
        RESTEndpoints[REST Endpoints]
        AuthMiddleware[Authentication Middleware]
    end
    
    subgraph "Business Logic Layer"
        ChatService[Chat Service]
        UserService[User Service]
        RoomService[Room Service]
        PowersService[Powers Service]
        ModerationService[Moderation Service]
        NotificationService[Notification Service]
    end
    
    subgraph "Data Access Layer"
        UserRepo[User Repository]
        RoomRepo[Room Repository]
        MessageRepo[Message Repository]
        PowersRepo[Powers Repository]
        FriendsRepo[Friends Repository]
    end
    
    subgraph "Database"
        UserDB[(User Data)]
        RoomDB[(Room Data)]
        MessageDB[(Message Data)]
        PowersDB[(Powers Data)]
        FriendsDB[(Friends Data)]
    end
    
    WSHandler --> ChatService
    WSHandler --> UserService
    WSHandler --> NotificationService
    
    RESTEndpoints --> UserService
    RESTEndpoints --> RoomService
    RESTEndpoints --> PowersService
    RESTEndpoints --> ModerationService
    
    AuthMiddleware --> WSHandler
    AuthMiddleware --> RESTEndpoints
    
    ChatService --> MessageRepo
    UserService --> UserRepo
    UserService --> FriendsRepo
    RoomService --> RoomRepo
    PowersService --> PowersRepo
    ModerationService --> UserRepo
    ModerationService --> RoomRepo
    NotificationService --> UserRepo
    
    UserRepo --> UserDB
    RoomRepo --> RoomDB
    MessageRepo --> MessageDB
    PowersRepo --> PowersDB
    FriendsRepo --> FriendsDB
```

## Component Interactions

```mermaid
sequenceDiagram
    participant User
    participant UI as User Interface
    participant Logic as Application Logic
    participant Comm as Communication Layer
    participant Server
    participant DB as Database
    
    User->>UI: Interact with chat
    UI->>Logic: Process interaction
    Logic->>Comm: Send data/request
    Comm->>Server: WebSocket/REST request
    Server->>DB: Query/Update data
    DB-->>Server: Return data
    Server-->>Comm: Response
    Comm-->>Logic: Process response
    Logic-->>UI: Update interface
    UI-->>User: Display result
```

## Data Flow for Message Sending

```mermaid
sequenceDiagram
    participant User
    participant ChatUI
    participant ChatManager
    participant EventBus
    participant WebSocket
    participant ChatService
    participant MessageRepo
    participant MessageDB
    
    User->>ChatUI: Type and send message
    ChatUI->>ChatManager: sendMessage(text)
    ChatManager->>EventBus: publish("message:send", messageData)
    EventBus->>WebSocket: send(messageData)
    WebSocket->>ChatService: onMessage(messageData)
    ChatService->>MessageRepo: saveMessage(messageData)
    MessageRepo->>MessageDB: insert(messageData)
    MessageDB-->>MessageRepo: success
    MessageRepo-->>ChatService: success
    ChatService-->>WebSocket: broadcast(messageData)
    WebSocket-->>EventBus: onMessage(broadcastData)
    EventBus-->>ChatManager: notify("message:received", broadcastData)
    ChatManager-->>ChatUI: displayMessage(broadcastData)
    ChatUI-->>User: Show message in chat
```

## Power Activation Flow

```mermaid
sequenceDiagram
    participant User
    participant PowersUI
    participant PowersManager
    participant EventBus
    participant WebSocket
    participant PowersService
    participant UserRepo
    
    User->>PowersUI: Activate power
    PowersUI->>PowersManager: activatePower(powerId)
    PowersManager->>PowersManager: checkCooldown(powerId)
    PowersManager->>EventBus: publish("power:activate", powerData)
    EventBus->>WebSocket: send(powerData)
    WebSocket->>PowersService: onPowerActivation(powerData)
    PowersService->>UserRepo: checkPowerAvailability(userId, powerId)
    UserRepo-->>PowersService: isAvailable
    PowersService->>PowersService: applyPowerEffect(powerData)
    PowersService-->>WebSocket: broadcast(powerEffectData)
    WebSocket-->>EventBus: onMessage(powerEffectData)
    EventBus-->>PowersManager: notify("power:effect", powerEffectData)
    PowersManager-->>PowersUI: displayPowerEffect(powerEffectData)
    PowersUI-->>User: Show power effect
    PowersManager->>PowersManager: startCooldown(powerId)
```

## Avatar Customization Flow

```mermaid
sequenceDiagram
    participant User
    participant AvatarUI
    participant AvatarManager
    participant EventBus
    participant RESTClient
    participant UserService
    participant UserRepo
    
    User->>AvatarUI: Customize avatar
    AvatarUI->>AvatarManager: updateAvatar(avatarData)
    AvatarManager->>EventBus: publish("avatar:update", avatarData)
    EventBus->>RESTClient: post("/api/user/avatar", avatarData)
    RESTClient->>UserService: updateUserAvatar(userId, avatarData)
    UserService->>UserRepo: saveUserAvatar(userId, avatarData)
    UserRepo-->>UserService: success
    UserService-->>RESTClient: success
    RESTClient-->>EventBus: notify("avatar:updated", avatarData)
    EventBus-->>AvatarManager: notify("avatar:updated", avatarData)
    AvatarManager-->>AvatarUI: refreshAvatarDisplay(avatarData)
    AvatarUI-->>User: Show updated avatar
```

## Room Customization Flow

```mermaid
sequenceDiagram
    participant RoomOwner
    participant RoomUI
    participant RoomManager
    participant EventBus
    participant RESTClient
    participant RoomService
    participant RoomRepo
    
    RoomOwner->>RoomUI: Customize room
    RoomUI->>RoomManager: updateRoomSettings(roomData)
    RoomManager->>EventBus: publish("room:update", roomData)
    EventBus->>RESTClient: post("/api/room/settings", roomData)
    RESTClient->>RoomService: updateRoomSettings(roomId, roomData)
    RoomService->>RoomRepo: saveRoomSettings(roomId, roomData)
    RoomRepo-->>RoomService: success
    RoomService-->>RESTClient: success
    RESTClient-->>EventBus: notify("room:updated", roomData)
    EventBus-->>RoomManager: notify("room:updated", roomData)
    RoomManager-->>RoomUI: applyRoomSettings(roomData)
    RoomUI-->>RoomOwner: Show updated room
```

## API Endpoints

### REST API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/register` | POST | User registration |
| `/api/auth/logout` | POST | User logout |
| `/api/user/profile` | GET | Get user profile |
| `/api/user/profile` | PUT | Update user profile |
| `/api/user/avatar` | PUT | Update user avatar |
| `/api/user/friends` | GET | Get user's friends list |
| `/api/user/friends/:id` | POST | Add friend |
| `/api/user/friends/:id` | DELETE | Remove friend |
| `/api/room` | GET | Get list of rooms |
| `/api/room` | POST | Create new room |
| `/api/room/:id` | GET | Get room details |
| `/api/room/:id` | PUT | Update room settings |
| `/api/room/:id/users` | GET | Get users in room |
| `/api/powers` | GET | Get available powers |
| `/api/powers/:id` | GET | Get power details |
| `/api/powers/user` | GET | Get user's powers |

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `user:join` | Server → Client | User joined room |
| `user:leave` | Server → Client | User left room |
| `user:status` | Server → Client | User status changed |
| `message:send` | Client → Server | Send message |
| `message:received` | Server → Client | New message received |
| `power:activate` | Client → Server | Activate power |
| `power:effect` | Server → Client | Power effect applied |
| `room:update` | Server → Client | Room settings updated |
| `typing:start` | Client → Server | User started typing |
| `typing:stop` | Client → Server | User stopped typing |

## Database Schema

### User Collection
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "displayName": "string",
  "avatar": {
    "type": "string",
    "customizations": "object"
  },
  "powers": [
    {
      "id": "string",
      "cooldownEnds": "timestamp"
    }
  ],
  "friends": ["userId"],
  "blocked": ["userId"],
  "status": "string",
  "lastSeen": "timestamp",
  "settings": {
    "sound": "boolean",
    "notifications": "boolean",
    "privacy": "object"
  }
}
```

### Room Collection
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "owner": "userId",
  "moderators": ["userId"],
  "background": {
    "type": "string",
    "url": "string"
  },
  "theme": {
    "colors": {
      "primary": "string",
      "secondary": "string",
      "text": "string"
    },
    "font": "string"
  },
  "settings": {
    "isPrivate": "boolean",
    "allowGuests": "boolean",
    "messageRateLimit": "number",
    "backgroundMusic": {
      "enabled": "boolean",
      "url": "string"
    }
  },
  "bannedUsers": ["userId"],
  "mutedUsers": [
    {
      "userId": "string",
      "until": "timestamp"
    }
  ]
}
```

### Message Collection
```json
{
  "id": "string",
  "roomId": "string",
  "userId": "string",
  "content": "string",
  "type": "string",
  "timestamp": "timestamp",
  "mentions": ["userId"],
  "powerEffect": {
    "powerId": "string",
    "effect": "string"
  }
}
```

### Power Collection
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "type": "string",
  "rarity": "string",
  "effects": {
    "visual": "string",
    "sound": "string",
    "interaction": "string"
  },
  "cooldown": "number",
  "icon": "string"
}
```

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- WebSocket API for real-time communication
- Canvas/WebGL for advanced visual effects
- Howler.js for sound management

### Backend
- Node.js with Express
- Socket.io for WebSocket communication
- Authentication middleware
- MongoDB for data storage
- Redis for caching and session management

### Development Tools
- Git for version control
- Webpack for bundling
- ESLint for code quality
- Jest for testing
- Docker for containerization

This architecture provides a comprehensive blueprint for implementing the xat recreation project, with clear separation of concerns and well-defined component interactions.