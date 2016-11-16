<#-- @ftlvariable name="" type="mil.dds.anet.resources.HomeResource.HomeView" -->
<#include "template/header.ftl">
<div class="anet-page-head">
	<h1 class="pull-left" style="margin-top:0px!important;">Your ANET at a glance</h1>
	<div class="submit pull-right"><a href="/reports/new"><btn type="submit" value="Submit Report" class="btn btn-default pull-right">Submit Report</btn></a>
</div>
<h3>Unapproved Reports</h3>
<div class="anet-block__body">
	<table class="usa-table-borderless">
		<thead>
			<tr class="header">
				<th scope="col">Reporters</th>
				<th scope="col">Summary</th>
				<th scope="col">Submitted</th>
			</tr>
		</thead>
		<tbody>
		<#list context.myPending as report>
			<tr>
				<th scope="row">${report.author.firstName} ${report.author.lastName}</th>
				<td>${report.intent}</td>
				<td>${report.updatedAt.toString('dd MMM yyyy')}</td>
				<td><a href="/reports/${report.id}">[View]</a></td>
			</tr>
		</#list>
		<#list context.myApprovals as report>
			<tr>
				<th scope="row">${report.author.firstName} ${report.author.lastName}</th>
				<td>${report.intent}</td>
				<td>${report.updatedAt.toString('dd MMM yyyy')}</td>
				<td><a href="/reports/${report.id}">[View]</a></td>
			</tr>
		</#list>
		</tbody>
	</table>
</div>
<hr>
<div class="anet-page-head">
	<h1 style="margin-top:0px!important;clear:both">ANET News and Updates</h1>
</div>
	<section class="anet-block">
		<div class="anet-block__title">
			<div class="pull-left">ANET Newsletter</div>
			<div class="pull-right">November 14th,2016</div>
		</div>

		<div class="anet-block__body">
		<h3>A letter from the SFAC</h3>
			<div class="anet-block__copy">
			Mauris congue dolor nec metus auctor tempor. Phasellus quam velit, tempor eu magna vitae, vulputate rhoncus lectus. Pellentesque semper turpis id elit vulputate, id porttitor quam pulvinar. Sed lobortis libero et felis fermentum, ac maximus ante gravida. Donec at ipsum ut est sollicitudin tincidunt. Nulla est enim, porta ac volutpat a, interdum et tortor. Nunc vel semper eros. Etiam pellentesque pellentesque est, eu blandit ligula placerat sit amet. Vestibulum et consectetur neque. Nullam rutrum nunc non vehicula laoreet. Quisque dignissim sollicitudin dui, ac convallis lectus. Pellentesque metus dui, ultrices et dignissim tristique, luctus vestibulum nisi. Quisque facilisis egestas est, eget ultrices sapien. Nunc accumsan nulla ut vulputate faucibus.<br>Donec maximus eros at dui iaculis, vel tristique nulla scelerisque.
			</div>
		</div>
	</section>

	<section class="anet-block">
		<div class="anet-block__title">
			<div class="pull-left">Daily Rollup</div>
			<div class="pull-right">November 14th,2016</div>
		</div>

		<div class="anet-block__body">
		<div class="anet-block__copy">
			Quisque dignissim sollicitudin dui, ac convallis lectus. Pellentesque metus dui, ultrices et dignissim tristique, luctus vestibulum nisi. Quisque facilisis egestas est, eget ultrices sapien. Nunc accumsan nulla ut vulputate faucibus.<br>Donec maximus eros at dui iaculis, vel tristique nulla scelerisque.
			</div>
			<table class="usa-table-borderless">
				<thead>
					<tr class="header">
						<th scope="col">Reporters</th>
						<th scope="col">Summary</th>
						<th scope="col">Submitted</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Gruuber ͐ Katz</th>
						<td>Statement adopted by the Continental Congress declaring independence from the British Empire.</td>
						<td>Yesterday</td>
					</tr>
					<tr>
						<th scope="row">Gruuber ͐ Katz</th>
						<td>Statement adopted by the Continental Congress declaring independence from the British Empire.</td>
						<td>Yesterday</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>


		<#-- <h1>Hello <strike>World</strike>ANET!</h1>
		<b>You are: ${context.currentUser}</b><br>
		<b>Here are the things you can do:</b>
		<ul>
			<li><a href="/reports/" >Reports</a></li>
			<li><a href="/people/" >People</a></li>
			<li><a href="/billets/" >Billets</a></li>
			<li><a href="/tashkils/" >Tashkils</a></li>
			<li><a href="/poams/" >POAMs</a></li>
			<li><a href="/advisorOrganizations/" >Advisor Organizations</a></li>
			<li><a href="/groups/" >Groups</a></li>
		</ul> -->
<#include "template/footer.ftl">
