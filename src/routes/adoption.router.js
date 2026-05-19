const express = require("express");
const { v4: uuidv4 } = require("uuid");
const adoptions = require("../data/adoptions");

const router = express.Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtiene todas las adopciones
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get("/", (req, res) => {
  res.status(200).json(adoptions);
});

router.get("/:id", (req, res) => {
  const adoption = adoptions.find(item => item.id === req.params.id);

  if (!adoption) {
    return res.status(404).json({
      error: "Adopción no encontrada"
    });
  }

  res.status(200).json(adoption);
});

router.post("/", (req, res) => {
  const { company, technology, region } = req.body;

  if (!company || !technology || !region) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  const newAdoption = {
    id: uuidv4(),
    company,
    technology,
    region
  };

  adoptions.push(newAdoption);

  res.status(201).json(newAdoption);
});

router.put("/:id", (req, res) => {
  const adoptionIndex = adoptions.findIndex(
    item => item.id === req.params.id
  );

  if (adoptionIndex === -1) {
    return res.status(404).json({
      error: "Registro no encontrado"
    });
  }

  adoptions[adoptionIndex] = {
    ...adoptions[adoptionIndex],
    ...req.body
  };

  res.status(200).json(adoptions[adoptionIndex]);
});

router.delete("/:id", (req, res) => {
  const adoptionIndex = adoptions.findIndex(
    item => item.id === req.params.id
  );

  if (adoptionIndex === -1) {
    return res.status(404).json({
      error: "Registro no encontrado"
    });
  }

  const removed = adoptions.splice(adoptionIndex, 1);

  res.status(200).json({
    message: "Registro eliminado",
    removed
  });
});

module.exports = router;
