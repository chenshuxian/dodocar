import React from 'react';

const Section = (props) => (
    <section className={props.className} id={props.sectionId}>
      <div className="container">
        <h2 className="text-center">{props.title}</h2>
        <hr className={props.hr} />
          {props.body}
      </div>
    </section>
);

export default Section;