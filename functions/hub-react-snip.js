    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task ? `{task.attributes.crmurl}` : `https://app.hubspot.com/contacts/HUB_INSTANCE_NUMBER/contacts/list/view/all/`;
    }