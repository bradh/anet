import React, {Component, PropTypes} from 'react'
import {DropdownButton, MenuItem, Button} from 'react-bootstrap'
import History from 'components/History'
import * as Models from 'models'

const DEFAULT_ACTIONS = [
	Models.Report,
]

const SUPER_USER_ACTIONS = [
	Models.Person,
	Models.Position,
	Models.Location,
]

const ADMIN_ACTIONS = [
	Models.Organization,
	Models.Poam,
]

export default class CreateButton extends Component {
	static contextTypes = {
		currentUser: PropTypes.object,
		app: PropTypes.object.isRequired,
	}

	render() {
		const currentUser = this.context.currentUser
		let appSettings = this.context.app.state.settings

		const modelClasses = DEFAULT_ACTIONS.concat(
			currentUser.isSuperUser() && SUPER_USER_ACTIONS,
			currentUser.isAdmin() && ADMIN_ACTIONS,
		).filter(value => !!value)

		if (modelClasses.length > 1) {
			return (
				<DropdownButton title="Create" bsStyle="primary" id="createButton" onSelect={this.onSelect}>
					{modelClasses.map((modelClass, i) =>
						<MenuItem key={modelClass.resourceName} eventKey={modelClass}>New {modelClass.displayName(appSettings) || modelClass.resourceName}</MenuItem>
					)}
				</DropdownButton>
			)
		} else if (modelClasses.length) {
			let modelClass = modelClasses[0]
			return (
				<Button bsStyle="primary" onClick={this.onSelect.bind(this, modelClass)} id="createButton">
					New {(modelClass.displayName(appSettings) || modelClass.resourceName).toLowerCase()}
				</Button>
			)
		}
	}

	onSelect(modelClass) {
		History.push(modelClass.pathForNew())
	}
}
