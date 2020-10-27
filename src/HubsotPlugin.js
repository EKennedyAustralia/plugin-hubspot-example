import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'HubsotPlugin';

export default class HubsotPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.CRMContainer.defaultProps.uriCallback = task => { 
      return task ? 
        !task.attributes.crmurl ? 
          !task.attributes.crmid ? 
            '//app.hubspot.com/contacts/4971620/contacts/list/view/all/?query=' + task.attributes.name :  
            '//app.hubspot.com/contacts/4971620/contacts/' + task.attributes.crmid :  
          task.attributes.crmurl :  
        '//app.hubspot.com/contacts/4971620/contacts/list/view/all/?';
    }
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
