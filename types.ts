export type GeneratedDataRow = Record<string, string | number | boolean | null>;

export interface GenerationState {
  isLoading: boolean;
  data: GeneratedDataRow[];
  error: string | null;
}

export interface FieldOption {
  id: string;
  label: string;
  category: 'personal' | 'financial' | 'business' | 'location';
}

export const AVAILABLE_FIELDS: FieldOption[] = [
  { id: 'nombre_completo', label: 'Nombre Completo', category: 'personal' },
  { id: 'email', label: 'Email Corporativo', category: 'personal' },
  { id: 'telefono', label: 'Teléfono Móvil', category: 'personal' },
  { id: 'dni', label: 'DNI / Identificación', category: 'personal' },
  { id: 'fecha_nacimiento', label: 'Fecha de Nacimiento', category: 'personal' },
  { id: 'direccion', label: 'Dirección Completa', category: 'location' },
  { id: 'ciudad', label: 'Ciudad', category: 'location' },
  { id: 'pais', label: 'País', category: 'location' },
  { id: 'empresa', label: 'Nombre de Empresa', category: 'business' },
  { id: 'puesto', label: 'Puesto de Trabajo', category: 'business' },
  { id: 'departamento', label: 'Departamento', category: 'business' },
  { id: 'iban', label: 'IBAN', category: 'financial' },
  { id: 'tarjeta_credito', label: 'Número de Tarjeta', category: 'financial' },
  { id: 'moneda', label: 'Moneda Preferida', category: 'financial' },
];