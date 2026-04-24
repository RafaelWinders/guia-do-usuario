// Initialize Mermaid with theme-aware config
document$.subscribe(() => {
  if (typeof mermaid === 'undefined') return;

  const getMermaidTheme = () => {
    const scheme = document.body.getAttribute('data-md-color-scheme');
    return scheme === 'slate' ? 'dark' : 'default';
  };

  mermaid.initialize({
    startOnLoad: false,
    theme: getMermaidTheme(),
    themeVariables: {
      primaryColor: '#4db8c7',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#5ec4d4',
      lineColor: '#5ec4d4',
      secondaryColor: '#1a9db8',
      tertiaryColor: '#0c0e1f'
    },
    flowchart: {
      curve: 'basis',
      useMaxWidth: true
    },
    sequence: {
      useMaxWidth: true
    }
  });

  // Find and render all mermaid blocks
  const mermaidBlocks = document.querySelectorAll('.mermaid');
  mermaidBlocks.forEach((block, i) => {
    if (!block.hasAttribute('data-processed')) {
      const id = `mermaid-${Date.now()}-${i}`;
      mermaid.render(id, block.textContent).then(({ svg }) => {
        block.innerHTML = svg;
        block.setAttribute('data-processed', 'true');
      }).catch(err => {
        console.error('Mermaid render failed:', err);
      });
    }
  });
});
