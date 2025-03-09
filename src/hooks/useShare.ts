import { useState } from 'react';
import { Memory } from '../mocks/memories';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

const useShare = (memories: Memory[]) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentShareItem, setCurrentShareItem] = useState<string | null>(null);

  // Open share modal for a specific memory
  const openShareModal = (id: string) => {
    setCurrentShareItem(id);
    setIsShareModalOpen(true);
  };

  // Close share modal
  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setCurrentShareItem(null);
  };

  // Get the memory being shared
  const getShareMemory = (): Memory | undefined => {
    if (!currentShareItem) return undefined;
    return memories.find(memory => memory.id === currentShareItem);
  };

  // Share via Web Share API if available
  const shareViaWebAPI = async (): Promise<boolean> => {
    const memory = getShareMemory();
    if (!memory) return false;

    const shareData: ShareOptions = {
      title: `Check out this memory: ${memory.title}`,
      text: memory.description || `A nostalgic ${memory.category.toLowerCase()} from ${memory.year}.`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        closeShareModal();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  };

  // Share via specific platform
  const shareViaPlatform = (platform: 'facebook' | 'twitter' | 'email' | 'copy') => {
    const memory = getShareMemory();
    if (!memory) return;

    const shareText = `Check out this memory: ${memory.title}`;
    const shareUrl = window.location.href;
    
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        window.location.href = url;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
          // Show a toast or notification that the link was copied
          console.log('Link copied to clipboard');
        });
        break;
    }
    
    closeShareModal();
  };

  return {
    isShareModalOpen,
    currentShareItem,
    openShareModal,
    closeShareModal,
    getShareMemory,
    shareViaWebAPI,
    shareViaPlatform
  };
};

export default useShare; 