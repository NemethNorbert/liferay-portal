import React from 'react';
import {AlloyEditor} from 'alloyeditor';

class ItemSelectorGoogleDocs extends React.Component {
	static defaultProps = {
		command: 'googledocsselector'
	};

	static key = 'googleDocs';

	render() {
		return (
			<button className="ae-button" data-type="button-googledocs" onClick={this.execCommand} tabIndex={this.props.tabIndex}>
				<span className="icon-file"></span>
			</button>
		);
	}
}

const googleDocs = AlloyEditor.Base.ButtonCommand(ItemSelectorGoogleDocs);
AlloyEditor.Buttons.googleDocs = googleDocs;

export default googleDocs;