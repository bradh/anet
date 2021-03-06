import Model from 'components/Model'

export default class Organization extends Model {
	static resourceName = 'Organization'
	static listName = 'organizationList'

	static schema = {
		shortName: '',
		longName: '',
		type: '',
		parentOrg: null,
		childrenOrgs: [],
		approvalSteps: [],
		positions: [],
		poams: []
	}

	isAdvisorOrg() {
		return this.type === 'ADVISOR_ORG'
	}

	humanNameOfType() {
		if (this.type === 'PRINCIPAL_ORG') {
			return "Afghan organization"
		} else {
			return "NATO organization"
		}
	}

	toString() {
		return this.shortName || this.longName
	}
}
