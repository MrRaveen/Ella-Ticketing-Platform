// --- API Configuration ---

const PORTS = {
  AUTH: 5001,
  USERS: 5001,
  STATIONS: 5002,
  ROUTES: 5002,
  PLATFORMS: 5002,
  TRAINS: 5003,
  TRAIN_INFOS: 5003,
  TRAIN_SEAT_CLASSES: 5003,
  TRAIN_TIMES: 5003,
  BOOKINGS: 5004
};

const getBaseUrl = (port: number) => `http://localhost:${port}/api`;

const fetchApi = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('railflow_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorMsg = 'API Request Failed';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch (e) {
      // Ignore JSON parse error
    }
    throw new Error(errorMsg);
  }

  // Handle empty responses (like 204 No Content)
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

// --- API Methods ---

export const api = {
  auth: {
    login: async (identifier: string, password: string, role: 'ADMIN' | 'CUSTOMER') => {
      const data = await fetchApi(`${getBaseUrl(PORTS.AUTH)}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ identifier, password, role })
      });
      // Store session
      localStorage.setItem('railflow_session', JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem('railflow_token', data.token);
      }
      return data.user;
    },
    register: async (userData: any) => {
      const data = await fetchApi(`${getBaseUrl(PORTS.AUTH)}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      localStorage.setItem('railflow_session', JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem('railflow_token', data.token);
      }
      return data.user;
    },
    logout: () => {
      localStorage.removeItem('railflow_session');
      localStorage.removeItem('railflow_token');
    },
    getCurrentUser: () => {
      const session = localStorage.getItem('railflow_session');
      return session ? JSON.parse(session) : null;
    }
  },
  
  stations: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.STATIONS)}/stations`);
    },
    add: async (station: any) => {
      return fetchApi(`${getBaseUrl(PORTS.STATIONS)}/stations`, {
        method: 'POST',
        body: JSON.stringify(station)
      });
    },
    update: async (id: string, station: any) => {
      return fetchApi(`${getBaseUrl(PORTS.STATIONS)}/stations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(station)
      });
    },
    delete: async (id: string) => {
      return fetchApi(`${getBaseUrl(PORTS.STATIONS)}/stations/${id}`, {
        method: 'DELETE'
      });
    }
  },

  trains: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.TRAINS)}/trains`);
    },
    add: async (train: any) => {
      return fetchApi(`${getBaseUrl(PORTS.TRAINS)}/trains`, {
        method: 'POST',
        body: JSON.stringify(train)
      });
    },
    update: async (id: string, train: any) => {
      return fetchApi(`${getBaseUrl(PORTS.TRAINS)}/trains/${id}`, {
        method: 'PUT',
        body: JSON.stringify(train)
      });
    },
    delete: async (id: string) => {
      return fetchApi(`${getBaseUrl(PORTS.TRAINS)}/trains/${id}`, {
        method: 'DELETE'
      });
    }
  },

  bookings: {
    getAll: async (userId?: string) => {
      const url = userId 
        ? `${getBaseUrl(PORTS.BOOKINGS)}/bookings?userId=${userId}`
        : `${getBaseUrl(PORTS.BOOKINGS)}/bookings`;
      return fetchApi(url);
    },
    create: async (bookingData: any) => {
      return fetchApi(`${getBaseUrl(PORTS.BOOKINGS)}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
    },
    cancel: async (id: string) => {
      return fetchApi(`${getBaseUrl(PORTS.BOOKINGS)}/bookings/${id}/cancel`, {
        method: 'POST'
      });
    }
  },

  users: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.USERS)}/users`);
    },
    addAdmin: async (adminData: any) => {
      return fetchApi(`${getBaseUrl(PORTS.USERS)}/users/admin`, {
        method: 'POST',
        body: JSON.stringify(adminData)
      });
    }
  },

  trainSeatClasses: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.TRAIN_SEAT_CLASSES)}/train-seat-classes`);
    },
    add: async (data: any) => {
      return fetchApi(`${getBaseUrl(PORTS.TRAIN_SEAT_CLASSES)}/train-seat-classes`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  },

  trainTimes: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.TRAIN_TIMES)}/train-times`);
    },
    add: async (data: any) => {
      return fetchApi(`${getBaseUrl(PORTS.TRAIN_TIMES)}/train-times`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  },

  routes: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.ROUTES)}/routes`);
    },
    add: async (data: any) => {
      return fetchApi(`${getBaseUrl(PORTS.ROUTES)}/routes`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  },

  platforms: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.PLATFORMS)}/platforms`);
    },
    add: async (data: any) => {
      return fetchApi(`${getBaseUrl(PORTS.PLATFORMS)}/platforms`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  },

  trainInfos: {
    getAll: async () => {
      return fetchApi(`${getBaseUrl(PORTS.TRAIN_INFOS)}/train-infos`);
    },
    add: async (data: any) => {
      return fetchApi(`${getBaseUrl(PORTS.TRAIN_INFOS)}/train-infos`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  }
};
