import Component from 'metal-component';
import {Config} from 'metal-state';
import Soy from 'metal-soy';

import templates from './ConfigurationPanel.soy';

/**
 * ConfigurationPanel
 */

class ConfigurationPanel extends Component {}

Soy.register(ConfigurationPanel, templates);

export default ConfigurationPanel;