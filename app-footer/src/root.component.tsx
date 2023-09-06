// Asignar React y ReactDOM desde el objeto window
const React = window.React;
const ReactDOM = window.ReactDOM;

export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}
