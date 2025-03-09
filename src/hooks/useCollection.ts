import { useState, useEffect } from 'react';
import { Memory } from '../mocks/memories';

interface CollectionState {
  items: string[];
  recentlyAdded: string | null;
}

const useCollection = () => {
  const [collection, setCollection] = useState<CollectionState>(() => {
    // Load from localStorage if available
    const savedCollection = localStorage.getItem('userCollection');
    return savedCollection 
      ? JSON.parse(savedCollection) 
      : { items: [], recentlyAdded: null };
  });

  // Save to localStorage whenever collection changes
  useEffect(() => {
    localStorage.setItem('userCollection', JSON.stringify(collection));
  }, [collection]);

  // Add an item to the collection
  const addToCollection = (id: string) => {
    setCollection(prev => {
      // If already in collection, don't add it again
      if (prev.items.includes(id)) {
        return prev;
      }
      
      return {
        items: [...prev.items, id],
        recentlyAdded: id
      };
    });
    
    // Reset the recently added flag after 3 seconds
    setTimeout(() => {
      setCollection(prev => ({
        ...prev,
        recentlyAdded: null
      }));
    }, 3000);
  };

  // Remove an item from the collection
  const removeFromCollection = (id: string) => {
    setCollection(prev => ({
      items: prev.items.filter(itemId => itemId !== id),
      recentlyAdded: null
    }));
  };

  // Check if an item is in the collection
  const isInCollection = (id: string) => {
    return collection.items.includes(id);
  };

  // Check if an item was recently added (for animation/feedback)
  const isRecentlyAdded = (id: string) => {
    return collection.recentlyAdded === id;
  };

  // Get all items in the collection
  const getCollectionItems = (allMemories: Memory[]) => {
    return allMemories.filter(memory => collection.items.includes(memory.id));
  };

  return {
    collection: collection.items,
    addToCollection,
    removeFromCollection,
    isInCollection,
    isRecentlyAdded,
    getCollectionItems
  };
};

export default useCollection; 