// Avatares disponibles: emoji sobre un fondo de color.
export const AVATARES = [
  { id: 'zorro', emoji: '🦊', color: '#fa9852', nombre: 'Zorro' },
  { id: 'buho', emoji: '🦉', color: '#8d6e63', nombre: 'Búho' },
  { id: 'pulpo', emoji: '🐙', color: '#e57373', nombre: 'Pulpo' },
  { id: 'lobo', emoji: '🐺', color: '#78909c', nombre: 'Lobo' },
  { id: 'panda', emoji: '🐼', color: '#90a4ae', nombre: 'Panda' },
  { id: 'tigre', emoji: '🐯', color: '#ffb74d', nombre: 'Tigre' },
  { id: 'ballena', emoji: '🐳', color: '#4fc3f7', nombre: 'Ballena' },
  { id: 'rana', emoji: '🐸', color: '#81c784', nombre: 'Rana' },
  { id: 'cohete', emoji: '🚀', color: '#7986cb', nombre: 'Cohete' },
  { id: 'unicornio', emoji: '🦄', color: '#ba68c8', nombre: 'Unicornio' },
  { id: 'dragon', emoji: '🐲', color: '#4db6ac', nombre: 'Dragón' },
  { id: 'pinguino', emoji: '🐧', color: '#64b5f6', nombre: 'Pingüino' },
];

export const getAvatar = (id) => AVATARES.find((a) => a.id === id) ?? AVATARES[0];
