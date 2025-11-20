# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account (if you don't have one)

## Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose the FREE tier (M0)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create Cluster"

## Step 3: Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and generate a secure password (SAVE THIS!)
5. Set user privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add only your server's IP address
4. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "5.5 or later"
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Create .env File

1. In the `backend` directory, create a file named `.env`
2. Add your connection string (replace `<username>` and `<password>` with your actual credentials):

   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/hotel?retryWrites=true&w=majority
   ```

   **Important:** Replace `your-username` and `your-password` with your actual database user credentials, and update the cluster URL with your actual cluster address.

3. Make sure to add `/hotel` before the `?` to specify the database name

## Step 7: Test Connection

Run the server:

```bash
node server.js
```

You should see: `✅ Connected to MongoDB Atlas successfully`

## Troubleshooting

### Connection Error: ENOTFOUND

- Check that your connection string is correct
- Verify your username and password are correct
- Make sure you've added your IP address in Network Access

### Authentication Failed

- Double-check your username and password
- Make sure special characters in password are URL-encoded (e.g., `@` becomes `%40`)

### Timeout Errors

- Check your network connection
- Verify your IP address is whitelisted in Network Access
- Try using the standard connection string format instead of SRV
