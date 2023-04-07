import { Request, Response } from "express";
import Cotizacion from "../models/cotizacionModel";
import CotizacionController from "./cotizacionController";

jest.mock("../models/cotizacionModel");

describe("CotizacionController", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getCotizaciones", () => {
    it("should return a list of cotizaciones", async () => {
      const cotizaciones = [
        {
          cliente: "Juan Pérez",
          fecha: "2023-04-05T00:00:00.000Z",
          total: 1500,
        },
        {
          cliente: "María González",
          fecha: "2023-04-03T00:00:00.000Z",
          total: 2500,
        },
      ];

      (Cotizacion.find as jest.Mock).mockResolvedValue(cotizaciones);

      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await CotizacionController.getCotizaciones(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(cotizaciones);
    });

    // Agrega más casos de prueba para diferentes escenarios
  });

  describe("createCotizacion", () => {
    it("should create a cotizacion and return it with a 201 status", async () => {
      const newCotizacionData = {
        cliente: "Pedro González",
        fecha: "2023-04-05T00:00:00.000Z",
        total: 2000,
      };

      const createdCotizacion = {
        _id: "642f9771f011f0cf28f83e8e",
        ...newCotizacionData,
      };

      (Cotizacion.create as jest.Mock).mockResolvedValue(createdCotizacion);

      const req = {
        body: newCotizacionData,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await CotizacionController.createCotizacion(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdCotizacion);
    });

    it("should return a 500 status when there's an error creating the cotizacion", async () => {
      const newCotizacionData = {
        cliente: "Pedro González",
        fecha: "2023-04-05T00:00:00.000Z",
        total: 2000,
      };

      const sampleError = new Error("Sample error message");
      (Cotizacion.create as jest.Mock).mockRejectedValue(sampleError);

      const req = {
        body: newCotizacionData,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await CotizacionController.createCotizacion(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error creating quotation",
        error: sampleError,
      });
    });
  });

  describe("getCotizacionById", () => {
    it("should return a cotizacion when a valid ID is provided", async () => {
      const cotizacion = {
        cliente: "Juan Pérez",
        fecha: new Date(),
        total: 1500,
        _id: "123456789012345678901234",
        __v: 0,
      };

      (Cotizacion.findById as jest.Mock).mockResolvedValue(cotizacion);

      const req = {
        params: { id: "123456789012345678901234" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await CotizacionController.getCotizacionById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(cotizacion);
    });

    it("should return a 404 status when the cotizacion is not found", async () => {
      (Cotizacion.findById as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { id: "999" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await CotizacionController.getCotizacionById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Cotizacion not found",
      });
    });
  });
});
