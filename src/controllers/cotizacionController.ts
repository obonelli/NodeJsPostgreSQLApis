import { Request, Response } from "express";
import Cotizacion, { ICotizacion } from "../models/cotizacionModel";

class CotizacionController {
  async getCotizaciones(req: Request, res: Response) {
    try {
      const cotizaciones = await Cotizacion.find();
      res.status(200).json(cotizaciones);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quotations" });
    }
  }

  async getCotizacionById(req: Request, res: Response) {
    try {
      const cotizacion = await Cotizacion.findById(req.params.id);
      if (!cotizacion) {
        return res.status(404).json({ message: "Cotizacion not found" });
      }
      res.status(200).json(cotizacion);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quotation" });
    }
  }

  async createCotizacion(req: Request, res: Response) {
    try {
      const { cliente, fecha, total } = req.body;
      const nuevaCotizacion = await Cotizacion.create({
        cliente,
        fecha,
        total,
      });
      res.status(201).json(nuevaCotizacion);
    } catch (error) {
      res.status(500).json({ message: "Error creating quotation", error });
    }
  }
}

export default new CotizacionController();
