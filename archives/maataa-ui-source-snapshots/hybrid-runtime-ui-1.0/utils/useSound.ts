export function useSound(url: string) {
    const play = () => {
      const a = new Audio(url);
      a.play();
    };
    return { play };
  }
  