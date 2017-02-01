import React, {PropTypes} from 'react'
import Page from 'components/Page'
import {ListGroup, ListGroupItem, DropdownButton, MenuItem} from 'react-bootstrap'

import Breadcrumbs from 'components/Breadcrumbs'
import Form from 'components/Form'
import autobind from 'autobind-decorator'
import History from 'components/History'
import LinkTo from 'components/LinkTo'
import Messages , {setMessages} from 'components/Messages'
import ReportCollection from 'components/ReportCollection'
import ScrollableFieldset from 'components/ScrollableFieldset'

import API from 'api'
import {Organization} from 'models'

export default class OrganizationReports extends Page {
	static contextTypes = {
		app: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			organization: {
				id: props.params.id,
				reports: []
			},
		}
		setMessages(props,this.state)
	}

	fetchData(props) {
		API.query(/* GraphQL */`
			organization(id:${props.params.id}) {
				id, shortName, longName, type
				parentOrg { id, shortName, longName }
				childrenOrgs { id, shortName, longName },
				reports(pageNum:0, pageSize:25) {
					id, intent, engagementDate, keyOutcomesSummary, nextStepsSummary
					author { id, name },
					primaryAdvisor { id, name } ,
					primaryPrincipal {id, name },
					advisorOrg { id, shortName, longName }
					principalOrg { id, shortName, longName }
					location { id, name, lat, lng }
				}
			}
		`).then(data => this.setState({organization: data.organization}))
	}

	render() {
		let org = this.state.organization

		let currentUser = this.context.app.state.currentUser;
		let isSuperUser = (currentUser) ? currentUser.isSuperUserForOrg(org) : false
		let isAdmin = (currentUser) ? currentUser.isAdmin() : false
		let showActions = isAdmin || isSuperUser;

		return (
			<div>
				<Breadcrumbs items={[[org.shortName || 'Organization', Organization.pathFor(org)]]} />

				<Messages error={this.state.error} success={this.state.success} />

				{ showActions &&
					<div className="pull-right">
						<DropdownButton bsStyle="primary" title="Actions" id="actions" className="pull-right" onSelect={this.actionSelect}>
							{isSuperUser && <MenuItem eventKey="edit" >Edit Organization</MenuItem>}
							{isAdmin && <MenuItem eventKey="createSub">Create Sub-Organization</MenuItem> }
							{isAdmin && <MenuItem eventKey="createPoam">Create Poam</MenuItem> }
							{isSuperUser && <MenuItem eventKey="createPos">Create new Position</MenuItem> }
						</DropdownButton>
					</div>
				}

				<Form static formFor={org} horizontal>
					<fieldset>
						<legend>
							{org.shortName}
						</legend>

						<Form.Field id="longName" label="Description"/>

						<Form.Field id="type">
							{org.type && org.type.split('_')[0]}
						</Form.Field>

						{org.parentOrg && org.parentOrg.id &&
							<Form.Field id="parentOrg" label="Parent">
								<LinkTo organization={org.parentOrg} />
							</Form.Field>
						}

						{org.childrenOrgs && org.childrenOrgs.length > 0 && <Form.Field id="childrenOrgs" label="Sub-Orgs">
							<ListGroup>
								{org.childrenOrgs.map(org =>
									<ListGroupItem key={org.id} ><LinkTo organization={org} /></ListGroupItem>
								)}
							</ListGroup>
						</Form.Field>}
					</fieldset>

					<ScrollableFieldset title="Recent Reports" height={500} >
						<ReportCollection reports={org.reports} />
					</ScrollableFieldset>
				</Form>
			</div>
		)
	}

	@autobind
	actionSelect(eventKey, event) {
		if (eventKey === "createPos") {
			History.push("/positions/new?organizationId=" + this.state.organization.id)
		} else if (eventKey === "createSub") {
			History.push("/organizations/new?parentOrgId=" + this.state.organization.id)
		} else if (eventKey === "edit") {
			History.push("/organizations/" + this.state.organization.id + "/edit")
		} else if (eventKey === "createPoam") {
			History.push("/poams/new?responsibleOrg=" + this.state.organization.id)
		} else {
			console.log("Unimplemented Action: " + eventKey);
		}
	}
}
