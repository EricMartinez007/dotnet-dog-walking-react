export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getAllDogs = async () => {
  const res = await fetch ("/api/dogs");
  return res.json();
};

export const getDogById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
};

export const deleteDog = async (id) => {
  const res = await fetch(`/api/dogs/${id}`, { method: "DELETE" });
  return res;
};

export const getAllCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};

export const createCity = async (cityName) => {
  const res = await fetch("/api/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: cityName }),
  });
  return res.json();
};

export const createDog = async (dogName, cityId) => {
  const res = await fetch("/api/dogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dogName, cityId: cityId })
  });
  return res.json();
};
