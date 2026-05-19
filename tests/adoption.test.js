const request = require("supertest");
const app = require("../src/server");

describe("Tests funcionales adoption.router.js", () => {

  test("GET /api/adoptions devuelve un arreglo", async () => {
    const response = await request(app).get("/api/adoptions");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/adoptions crea un nuevo registro", async () => {
    const adoptionData = {
      company: "EcoWind",
      technology: "Turbinas eólicas",
      region: "Valparaíso"
    };

    const response = await request(app)
      .post("/api/adoptions")
      .send(adoptionData);

    expect(response.statusCode).toBe(201);
    expect(response.body.company).toBe("EcoWind");
  });

  test("POST /api/adoptions valida datos incompletos", async () => {
    const response = await request(app)
      .post("/api/adoptions")
      .send({
        company: "Error"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("GET /api/adoptions/:id retorna 404 si no existe", async () => {
    const response = await request(app)
      .get("/api/adoptions/id-inexistente");

    expect(response.statusCode).toBe(404);
  });

  test("PUT /api/adoptions/:id actualiza un registro", async () => {
    const create = await request(app)
      .post("/api/adoptions")
      .send({
        company: "Solar Update",
        technology: "Paneles",
        region: "Coquimbo"
      });

    const response = await request(app)
      .put(`/api/adoptions/${create.body.id}`)
      .send({
        region: "Atacama"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.region).toBe("Atacama");
  });

  test("DELETE /api/adoptions/:id elimina un registro", async () => {
    const create = await request(app)
      .post("/api/adoptions")
      .send({
        company: "Delete Test",
        technology: "Solar",
        region: "Biobío"
      });

    const response = await request(app)
      .delete(`/api/adoptions/${create.body.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Registro eliminado");
  });
});
