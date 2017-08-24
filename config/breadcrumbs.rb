crumb :root do
  admin = params[:controller].include?("admins")
  link t("breadcrumbs.home"), admin ? "/admins/companies" : root_path
end

## -------------------------------------------------
## Account
## -------------------------------------------------

crumb :account_evaluation_processes do
  link t("breadcrumbs.evaluation_processes"), accounts_evaluation_processes_path
end

crumb :account_evaluation_process do |process|
  link process.name, edit_accounts_evaluation_process_path(process)
  parent :account_evaluation_processes
end

crumb :new_account_evaluation_process do
  link t("breadcrumbs.new_evaluation_process")
  parent :account_evaluation_processes
end

crumb :account_survey do |survey|
  link survey.name, edit_accounts_survey_path(survey)
  process = survey.evaluation_process
  parent :account_evaluation_process, process
end

crumb :account_survey_sections do |survey|
  link t("breadcrumbs.survey_sections"), edit_accounts_survey_ideal_profile_path(survey)
  parent :account_survey, survey
end

crumb :account_participant do |participant, process|
  link t("breadcrumbs.participant", email: participant.email)
  parent :account_evaluation_process, process
end

crumb :account_participation do |participation, process|
  link t("breadcrumbs.participation", email: participation.email)
  parent :account_evaluation_process, process
end

crumb :account_evaluation_process_report do |process|
  link t("breadcrumbs.account_evaluation_process_report"),
       accounts_reports_evaluation_process_path(process)
  parent :account_evaluation_process, process
end

crumb :account_participation_report do |participation|
  link t("breadcrumbs.account_participation_report",
         participation: participation.full_name),
       accounts_reports_participation_path(participation)
  parent :account_evaluation_process_report, participation.evaluation_process
end

crumb :account_participation_report_survey do |participation, survey|
  link survey.name
  parent :account_participation_report, participation
end

crumb :account_participation_ideal_profile_index do |participation|
  link t("breadcrumbs.list_of_templates"),
       accounts_reports_participation_profile_templates_path(
        participation_id: participation.id)
  parent :account_participation_report, participation
end

crumb :account_participation_report_comparison do |participation, template|
  link t("breadcrumbs.comparison_with_template", template_name: template.name)
  parent :account_participation_ideal_profile_index, participation
end

## -------------------------------------------------
## Admin
## -------------------------------------------------

crumb :admin_companies do
  link t("breadcrumbs.companies"), admins_companies_path
end

crumb :admin_company do |company|
  link company.name, admins_company_path(company)
  parent :admin_companies
end

crumb :new_admin_company do
  link t("breadcrumbs.new_company")
  parent :admin_companies
end

crumb :admin_evaluation_process do |process, company|
  link process.name, edit_admins_company_evaluation_process_path(process, company_id: company.id)
  parent :admin_company, company
end

crumb :new_admin_evaluation_process do |company|
  link t("breadcrumbs.new_evaluation_process")
  parent :admin_company, company
end

crumb :admin_survey do |survey, company|
  link survey.name, edit_admins_company_survey_path(survey, company_id: company.id)
  parent :admin_evaluation_process, survey.evaluation_process, company
end

crumb :admin_survey_sections do |survey, company|
  link t("breadcrumbs.survey_sections"), edit_admins_company_survey_ideal_profile_path(survey, company_id: company.id)
  parent :admin_survey, survey, company
end

crumb :admin_participant do |participant, process|
  link t("breadcrumbs.participant", email: participant.email)
  parent :admin_evaluation_process, process, process.company
end

crumb :admin_participation do |participation, process|
  link t("breadcrumbs.participation", email: participation.email)
  parent :admin_evaluation_process, process, process.company
end

crumb :admin_admins do
  link t("breadcrumbs.admins"), admins_admins_path
end

crumb :admin_admin do |admin|
  link admin.email, admins_admin_path(admin)
  parent :admin_admins
end

crumb :admin_categories do
  link t("breadcrumbs.categories"), admins_categories_path
end

crumb :admin_category do |category|
  name = t("multiplicity.categories.#{category.name}")
  link t("breadcrumbs.category", category_name: name),
       edit_admins_category_path(category)
  parent :admin_categories
end

crumb :admin_category_groups do
  link t("breadcrumbs.category_groups"), admins_category_groups_path
end

crumb :admin_category_group do |group|
  name = t("multiplicity.category_groups.#{group.name}", default: group.name)
  link t("breadcrumbs.category_group", group: name),
       edit_admins_category_group_path(group)
  parent :admin_category_groups
end

crumb :admin_question do |question|
  link t("breadcrumbs.question", question_id: question.id),
       admins_question_path(question)
  parent :admin_categories
end

crumb :admin_item do |item|
  link t("breadcrumbs.item", item_id: item.id), admins_item_path(item)
  parent :admin_categories
end

crumb :new_admin_admin do
  link t("breadcrumbs.new_admin")
  parent :admin_admins
end

crumb :admin_accounts do |company|
  link t("breadcrumbs.admins"), admins_company_accounts_path(company_id: company.id)
end

crumb :admin_process_reports do
  link t("breadcrumbs.process_reports"), admins_process_reports_path
end

crumb :admin_account do |account_name, company|
  link t("breadcrumbs.account", username: account_name)
  parent :admin_companies, company
end

crumb :new_admin_account do |company|
  link t("breadcrumbs.new_account")
  parent :admin_company, company
end

crumb :admin_evaluation_process_report do |process, company|
  link t("breadcrumbs.account_evaluation_process_report"),
       admins_company_reports_evaluation_process_path(
          process, company_id: company.id)
  parent :admin_evaluation_process, process, company
end

crumb :admin_participation_report do |participation, company|
  link t("breadcrumbs.account_participation_report",
         participation: participation.email),
       admins_company_reports_participation_path(participation, company_id: company.id)
  parent :admin_evaluation_process_report, participation.evaluation_process, company
end

crumb :admin_participation_report_survey do |participation, company, survey|
  link survey.name
  parent :admin_participation_report, participation, company
end

crumb :admin_participation_ideal_profile_index do |participation, company|
  link t("breadcrumbs.list_of_templates"),
       admins_company_reports_participation_profile_templates_path(
         participation_id: participation.id, company_id: company.id)
  parent :admin_participation_report, participation, company
end

crumb :admin_participation_report_comparison do |participation, company, template|
  link t("breadcrumbs.comparison_with_template", template_name: template.name)
  parent :admin_participation_ideal_profile_index, participation, company
end

crumb :v2_report_templates do
  link t("breadcrumbs.report_template"), v2_report_templates_path
end
