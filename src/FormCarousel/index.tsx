import React from 'react';
import styled from 'styled-components';
import { StageButton } from './StageButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FormCarouselProps, FormCarouselState, FormCarousel_Stage, FormCarousel_Form } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  min-height: 40vh;
  width: 100%;
  
  > header {
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 1.5em 0;

    > .separator {
      svg, path {
        fill: #ccc;
      }
    }

    > button {
      margin: 0 1.5em;
      min-width: 150px;
    }
  }

  > div {
    display: flex;
    flex: 1;
    position: relative;

    .hidden {
      display: none;
    }
  }`;

export class FormCarousel extends React.Component<FormCarouselProps, FormCarouselState> {

  state: FormCarouselState = {
    activeStage: 0,
    stageOut: -1,
    stageStatus: []
  };

  constructor (props: FormCarouselProps) {
    super(props);

    const stages = props.stages.map((item: FormCarousel_Stage) => {
      return false;
    });

    this.state.stageStatus = stages;
  }

  toggleActiveStage = (index: number) => {

    this.setState({
      activeStage: index,
      stageOut: this.state.activeStage
    });
  }

  setStageCompleted = (index: number, completed: boolean) => {
    let stageStatus = Object.values(this.state.stageStatus);
    stageStatus[index] = true;
    this.setState({ stageStatus: stageStatus });
  }

  render () {

    return (
      <Wrapper>
        <header>
          {this.props.stages.map((item: FormCarousel_Stage, i: number) => {
            return (
              <React.Fragment
                key={i}>
                {i > 0 && <FontAwesomeIcon className='separator' icon={faAngleDoubleRight} transform="grow-4" />}
                <StageButton
                  active={(i === this.state.activeStage ? true : false)}
                  complete={this.state.stageStatus[i] === true}
                  icon={item.icon}
                  index={i}
                  label={item.label}
                  toggle={this.toggleActiveStage}
                />
              </React.Fragment>);
          })}
        </header>

        <div>
          {this.props.stages.map((stage: FormCarousel_Stage, i: number) => {

            const Form: React.ComponentType<FormCarousel_Form> = stage.form;

            return (
              <Form
                className={this.state.activeStage !== i && this.state.stageOut !== i ? `hidden` : ``}
                index={i}
                key={i}
                setCompleted={this.setStageCompleted}
                toggleStage={this.toggleActiveStage}
                transition={this.state.activeStage === i ?
                  this.state.activeStage > this.state.stageOut
                    ? `stage_in_right`
                    : `stage_in_left`
                  : this.state.stageOut === i
                    ? this.state.activeStage < this.state.stageOut
                      ? `stage_out_right`
                      : `stage_out_left`
                    : `none`}
              />
            );
          }
          )}
        </div>
      </Wrapper>
    );
  }
}

export default FormCarousel;