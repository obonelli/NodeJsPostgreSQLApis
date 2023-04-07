// src/models/cotizacionModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICotizacion extends Document {
  cliente: string;
  fecha: Date;
  total: number;
}

const CotizacionSchema: Schema = new Schema({
  cliente: { type: String, required: true },
  fecha: { type: Date, required: true },
  total: { type: Number, required: true },
});

export default mongoose.model<ICotizacion>('Cotizacion', CotizacionSchema);