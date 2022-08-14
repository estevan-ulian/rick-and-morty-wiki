export default function scrollToTop(timeout: number) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }, timeout);
  }