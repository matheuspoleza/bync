export const useScript = (src: string) => {
  const loadScript = (onLoad: () => void) => {
    const node = document.createElement('script');
    node.src = src;
    node.type = 'text/javascript';
    node.async = true;
    node.onload = onLoad;
    // Add script to document body
    document.body.appendChild(node);
  };

  return { loadScript };
};
