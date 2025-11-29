// lib/appwrite.js
import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://[YOUR_APPWRITE_ENDPOINT]') // Your Appwrite Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '[YOUR_PROJECT_ID]'); // Your project ID

// Initialize Appwrite services
const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, databases, account, storage };

