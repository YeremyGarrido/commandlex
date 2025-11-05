import * as favs from '@/lib/favs';

describe('favs module', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('toggle', () => {
    it('should add a favorite', () => {
      favs.toggle('ls');
      expect(favs.has('ls')).toBe(true);
    });

    it('should remove a favorite when toggled twice', () => {
      favs.toggle('ls');
      expect(favs.has('ls')).toBe(true);
      
      favs.toggle('ls');
      expect(favs.has('ls')).toBe(false);
    });
  });

  describe('has', () => {
    it('should return false for non-existent favorite', () => {
      expect(favs.has('non-existent')).toBe(false);
    });

    it('should return true for existing favorite', () => {
      favs.toggle('git-status');
      expect(favs.has('git-status')).toBe(true);
    });
  });

  describe('getAll', () => {
    it('should return empty array when no favorites', () => {
      expect(favs.getAll()).toEqual([]);
    });

    it('should return all favorites', () => {
      favs.toggle('ls');
      favs.toggle('git-status');
      favs.toggle('docker-ps');

      const all = favs.getAll();
      expect(all).toHaveLength(3);
      expect(all).toContain('ls');
      expect(all).toContain('git-status');
      expect(all).toContain('docker-ps');
    });
  });

  describe('clear', () => {
    it('should remove all favorites', () => {
      favs.toggle('ls');
      favs.toggle('git-status');
      
      expect(favs.getAll()).toHaveLength(2);
      
      favs.clear();
      
      expect(favs.getAll()).toHaveLength(0);
    });
  });
});
