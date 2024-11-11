import axios from 'axios';
import * as encrypt from './encrypt';
import { retTr } from './__trash';

// Decrypt the connection key
const CON_KEY = encrypt.decrypter(
  encrypt.decrypter(encrypt.decrypter(encrypt.decrypter(retTr())))
);

const from = "http://127.0.0.1:876"; // Local server
// const from = "https://sarahdb.pythonanywhere.com"; // Live server

const linkPrefix = `${from}/${CON_KEY}/handler`;
const DB_URL = `${from}/login/${CON_KEY}`;

export class DbORM {
  constructor() {
    this.database = {}; // Adjusted typing
    this.connect(); // Connect on initialization
  }

  // Connect to the server
  async connect() {
    try {
      const response = await axios.get(DB_URL);
      if (response.status === 200) {
        console.log("Connected to db server successfully");
      } else {
        console.log("Error connecting to db server");
      }
    } catch (error) {
      console.error("Error connecting to db server:", error);
    }
  }

  // A general method to make GET and POST requests
  async request(url, method = 'get', data) {
    try {
      const response = method === 'get' ? await axios.get(url) : await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error in ${method.toUpperCase()} request:`, error);
      throw error;
    }
  }

  // Retrieve all data
  async all() {
    return this.request(`${linkPrefix}/handler`);
  }

  // Retrieve all entries for a specific model
  async getAll(model) {
    return this.request(`${linkPrefix}/get_all/${model}`);
  }

  // Find all entries that match a column-value pair
  async findAll(model, column, value) {
    return this.request(`${linkPrefix}/find_all/${model}/${column}/${value}`);
  }

  // Find a single entry based on column-value pair
  async findOne(model, column, value) {
    console.log("$$$", model, column, value, linkPrefix);
    return this.request(`${linkPrefix}/find_one/${model}/${column}/${value}`);
  }

  // Add a single column-value pair
  async addOne(model, column, value) {
    return this.request(`${linkPrefix}/add_one/${model}/${column}/${value}`);
  }

  // Add an entry with multiple column-value pairs
  async addEntry(model, columnValuePairs) {
    const data = {
      model,
      column_value_pairs: encrypt.encrypter(JSON.stringify(columnValuePairs)),
    };
    return this.request(`${linkPrefix}/add_entry`, 'post', data);
  }

  // Update a single column in an entry
  async updateOne(model, column, valueSearch, valueUpdate) {
    return this.request(`${linkPrefix}/update_one/${model}/${column}/${valueSearch}/${valueUpdate}`);
  }

  // Update an entry with multiple column-value pairs
  async updateEntry(model, column, columnValuePairs, dnd) {
    if (dnd) {
      const data = {
        model,
        column,
        cvp: JSON.stringify(columnValuePairs),
      };
      return this.request(`${linkPrefix}/update_entry_dnd`, 'post', data);
    } else {
      return this.request(`${linkPrefix}/update_entry/${model}/${column}/${JSON.stringify(columnValuePairs)}`);
    }
  }

  // Delete an entry by column
  async deleteEntry(model, column) {
    return this.request(`${linkPrefix}/delete_entry/${model}/${column}`);
  }

  // Sanitize a string by removing special characters
  sanitizeString(string) {
    return string.replace(/['"/\\]/g, ''); // Removes quotes, slashes, etc.
  }

  // Retrieve Base64 encoded media from the database
  async getBase64Media(mediaID) {
    const result = await this.findOne('base64_images', 'id', mediaID);
    if (result.status[0] === "not found") {
      return null;
    } else {
      const allImages = await this.getAll('base64_images');
      return allImages[result.status[1]].base64;
    }
  }
}

// export const dbORM = new DbORM();
