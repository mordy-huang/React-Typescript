import React from "react";
import renderer from "react-test-renderer";

const Link: React.FC<{ page: string; children: any }> = ({ page, children }) => (
  <a className="normal" href={page}>
    {children}
  </a>
);

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
