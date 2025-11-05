import { search } from '@/lib/search';
import type { Command } from '@/lib/data';

const mockCommands: Command[] = [
  {
    id: 'ls',
    comando: 'ls',
    entorno: 'Linux',
    nivel: 'básico',
    descripcion: 'Lista archivos y directorios',
    ejemplo: ['ls -la'],
    requerimientos: 'Ninguno',
    tags: ['listar', 'archivos'],
  },
  {
    id: 'git-status',
    comando: 'git status',
    entorno: 'Git',
    nivel: 'básico',
    descripcion: 'Muestra el estado del repositorio',
    ejemplo: ['git status'],
    requerimientos: 'Git instalado',
    tags: ['git', 'estado'],
  },
  {
    id: 'docker-ps',
    comando: 'docker ps',
    entorno: 'Docker',
    nivel: 'intermedio',
    descripcion: 'Lista contenedores',
    ejemplo: ['docker ps'],
    requerimientos: 'Docker instalado',
    tags: ['docker', 'contenedores'],
  },
];

describe('search function', () => {
  it('should return all commands when query is empty', () => {
    const result = search(mockCommands, '');
    expect(result).toHaveLength(3);
  });

  it('should filter by command name', () => {
    const result = search(mockCommands, 'git');
    expect(result).toHaveLength(1);
    expect(result[0].comando).toBe('git status');
  });

  it('should filter by description', () => {
    const result = search(mockCommands, 'lista');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter by tags', () => {
    const result = search(mockCommands, 'archivos');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should be case insensitive', () => {
    const result = search(mockCommands, 'DOCKER');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('docker-ps');
  });

  it('should filter by environment', () => {
    const result = search(mockCommands, '', { entorno: 'Linux' });
    expect(result).toHaveLength(1);
    expect(result[0].entorno).toBe('Linux');
  });

  it('should filter by nivel', () => {
    const result = search(mockCommands, '', { nivel: 'intermedio' });
    expect(result).toHaveLength(1);
    expect(result[0].nivel).toBe('intermedio');
  });

  it('should combine text and filter options', () => {
    const result = search(mockCommands, 'git', { entorno: 'Git' });
    expect(result).toHaveLength(1);
    expect(result[0].comando).toBe('git status');
  });
});
