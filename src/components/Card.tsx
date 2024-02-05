import "../styles/Card.scss";

function Card(props: {
  variant?: string;
  extra?: string;
  children?: JSX.Element | any[];
  [x: string]: any;
}) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div className={`card ${extra}`} {...rest}>
      {children}
    </div>
  );
}

export default Card;
