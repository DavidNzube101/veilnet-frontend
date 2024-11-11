import { dbORM } from './database/db';
import { SDBEIsFound } from './database/SarahDB-Extenstion';
import * as encrypt from './database/encrypt';

export async function registerUser(username, email, password) {
  try {
    // Check if the username or email already exists
    const existingUser = await SDBEIsFound('users', 'username', username);
    const existingEmail = await SDBEIsFound('users', 'email', email);

    if (existingUser || existingEmail) {
      console.log('Username or email already exists');
      return false;
    }

    // Hash the password before storing
    const hashedPassword = encrypt.encrypter(password);

    // Add the new user to the database
    const result = await dbORM.addEntry('users', {
      username,
      email,
      password: hashedPassword
    });

    if (result && result.status && result.status[0] === 'success') {
      console.log('User registered successfully');
      return true;
    } else {
      console.log('Failed to register user');
      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
}

export async function loginUser(username, password) {
  try {
    const user = await SDBEIsFound('users', 'username', username);

    if (!user) {
      console.log('User not found');
      return false;
    }

    // Decrypt the stored password and compare
    const storedPassword = encrypt.decrypter(user.password);
    if (storedPassword === password) {
      console.log('Login successful');
      return true;
    } else {
      console.log('Incorrect password');
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
}