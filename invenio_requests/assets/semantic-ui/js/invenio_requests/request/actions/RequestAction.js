// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { RequestActionContext } from "@js/invenio_requests/request/actions/context";
import FormattedInputEditor from "../../components/FormattedInputEditor";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { Button, Divider, Modal, Message } from "semantic-ui-react";
import { RequestActionModal } from "./RequestActionModal";
import { Trans } from "react-i18next";

export class RequestAction extends Component {
  static contextType = RequestActionContext;

  constructor(props) {
    super(props);
    this.state = { actionComment: "", modalOpen: false };
  }

  onCommentChange = (event, editor) => {
    this.setState({ actionComment: editor.getData() });
  };

  handleActionClick = () => {
    const { performAction } = this.context;
    const { action } = this.props;
    const { actionComment } = this.state;
    performAction(action, actionComment);
  };

  render() {
    const { loading, performAction, toggleModal, error } = this.context;
    const { action } = this.props;
    const modalId = action;
    return (
      <Overridable
        id="InvenioRequests.RequestAction.layout"
        action={action}
        loading={loading}
        performAction={performAction}
      >
        <>
          <Button onClick={() => toggleModal(modalId, true)} loading={loading}>
            <Trans defaults="{{action}}" values={{ action: action }} />
          </Button>
          <RequestActionModal
            action={action}
            handleActionClick={this.handleActionClick}
            modalId={modalId}
          >
            <Modal.Content>
              {error && (
                <Message negative>
                  <p>{error}</p>
                </Message>
              )}

              <Modal.Description>
                <Trans
                  defaults="Comment on your {{action}} request action (optional)."
                  values={{ action: action }}
                />
                <Divider hidden />
                <FormattedInputEditor onChange={this.onCommentChange} />
              </Modal.Description>
            </Modal.Content>
          </RequestActionModal>
        </>
      </Overridable>
    );
  }
}

RequestAction.propTypes = {
  action: PropTypes.string.isRequired,
};

export default Overridable.component(
  "InvenioRequests.RequestAction",
  RequestAction
);
