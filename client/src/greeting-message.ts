const createGreetingMessage = (user: string, colour: string): HTMLElement => {
  const createElement = window.document.createElement('div');
  const greetingHeader = window.document.createElement('h2');
  const greetingMessage = window.document.createElement('p');

  greetingHeader.innerHTML = `Hello, ${user}!`;
  greetingMessage.innerHTML = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
  createElement.appendChild(greetingHeader);
  createElement.appendChild(greetingMessage);
  createElement.classList.add(colour);

  return createElement;
};

export { createGreetingMessage };
