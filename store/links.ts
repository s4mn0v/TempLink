import { defineStore } from 'pinia';
import type { Link } from '@/types/link';
import { v4 as uuidv4 } from 'uuid';

export const useLinksStore = defineStore('links', {
  state: () => ({
    links: [] as Link[],
  }),

  actions: {
    loadLinks() {
      const savedLinks = localStorage.getItem('links');
      if (savedLinks) {
        this.links = JSON.parse(savedLinks);
        this.cleanExpiredLinks();
      }
    },

    addLink(title: string, timeLimit: number) {
      if (this.links.length < 5) {
        const link: Link = {
          id: uuidv4(),
          title,
          timeLimit,
          createdAt: Date.now(),
        };
        this.links.push(link);
        this.saveLinks();
      }
    },

    deleteLink(id: string) {
      this.links = this.links.filter(link => link.id !== id);
      this.saveLinks();
    },

    saveLinks() {
      localStorage.setItem('links', JSON.stringify(this.links));
    },

    cleanExpiredLinks() {
      const now = Date.now();
      this.links = this.links.filter(link => {
        const expirationTime = link.createdAt + (link.timeLimit * 60 * 1000);
        return now < expirationTime;
      });
      this.saveLinks();
    },

    isLinkValid(id: string): boolean {
      const link = this.links.find(l => l.id === id);
      if (!link) return false;
      
      const now = Date.now();
      const expirationTime = link.createdAt + (link.timeLimit * 60 * 1000);
      return now < expirationTime;
    },
  },
});