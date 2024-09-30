type Link = [string, string];

export type HeaderProps = {
	links: Link[];
};

export const Header = ({ links }: HeaderProps): JSX.Element => {
	console.log("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
	console.log(links);
	return (
		<header class="header">
			<div>
				<a href="/">Home</a>
				<nav>
					<ul role="list">
						{links.map(([title, url]) => (
							<li>
								<a href={url}>{title}</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
