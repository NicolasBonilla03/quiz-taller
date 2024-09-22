export interface Nota {
  corte: string;  // Ejemplo: "Primer Corte", "Segundo Corte", etc.
  fechaEntrega: string;
  descripcion: string;
  nota?: number;  // Nota entre 0 y 5
  observaciones?: string;
}
