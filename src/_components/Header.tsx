type Link = [string, string];

export type HeaderProps = {
  links: Link[];
  currentPage: string;
  bottomEl: boolean;
};

export const Header = ({ links, currentPage }: HeaderProps): JSX.Element => {
  return (
    <header class="header">
      <nav>
        <a aria-current={currentPage === "/" ? "page" : null} href="/">
          Home
        </a>
        <ul role="list">
          {links.map(([title, url]) => (
            <li>
              <a aria-current={currentPage === url ? "page" : null} href={url}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
