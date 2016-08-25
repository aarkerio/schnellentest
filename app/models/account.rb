
class Account

  def self.get_user(guid)
    User.where( guid: guid, active: true ).first
  end

  def self.create_token(params)
    conditions = build_conditions(params)
    user = User.where( conditions ).first
    return user   if user.nil? || user.guid.present?
    user.update_attribute('guid', user.get_token)
    user
  end

  def self.get_guid(user_params)
    conditions = build_conditions(user_params)
    User.where(conditions).first
  end

  def create_user(user_params)
    register_params = remove_params user_params
    validate        = validate_fields register_params
    return validation_messages(validate) if validate != true
    user = User.new register_params
    user.save!
    user
  end

  def update_user(user_params)
    update_params = remove_params user_params
    user = User.find_by_guid user_params[:guid]
    return   if user.nil?
    user.assign_attributes(update_params)
    user.save!
    user
  end

  def disable_user(guid)
    user = User.where( guid: guid, active: true ).first
    return false if user.nil?
    user.update_attribute(:active, false)
  end

  private

  def self.build_conditions(params)
    conditions = if params[:email].present?
                   {email: params[:email]}
                 elsif params[:id].present?
                   { id: params[:id] }
                 end
    conditions[:active] = true
    conditions
  end

  def validate_fields(params)
    return true  # not implemented yet
    return 50   if params[:user_type].nil?
    return 51   if params[:email].nil?
    return 52   if params[:first].nil?
    return 53   if params[:last].nil?
    return 55   if params[:prefix].present? && (%w(Dr MD Ms Miss Mrs Mr).include? params[:prefix] == false)
    return 56   if params[:first].length > 100
    return 57   if params[:last].present? && (params[:last].length > 10)
    return 58   if params[:middle].present? && (params[:middle].length > 10)
    return 59   if params[:suffix].present? && (params[:suffix].length > 10)
    return 60   if (params[:email] =~ /@/).nil?
    return 61   if User.exists? email: params[:email]
    return 62   if params[:notes].present? && (params[:notes].length > 200)
    return 63   if params[:address1].present? && (params[:address1].length > 100)
    return 64   if params[:address2].present? && (params[:address2].length > 100)
    return 65   if params[:city].present? && (params[:city].length > 70)
    return 66   if params[:province].present? && (params[:province].length > 30)
    return 67   if params[:postal_code].present? && ((params[:postal_code] =~ /\./).nil? == false)
    return 68   if params[:postal_code].present? && (params[:postal_code].length > 10)
    return 70   if params[:country].nil?
    return 69   if Country.find_by_iso(params[:country]).nil?
    return 71   if params[:province].present? && (params[:province].length > 30)
    return 72   if params[:suffix].present? && (params[:suffix].length > 10)
    return 73   if params[:job_title].present? && (params[:job_title].length > 100)
    return 74   if params[:home_phone].present? && (params[:home_phone].length > 30)
    return 75   if params[:cell_phone].present? && (params[:cell_phone].length > 30)
    return 76   if params[:home_phone].present? && (params[:home_phone].length > 30)
    return 77   if params[:fax].present? && (params[:fax].length > 32)
    true
  end

  def validation_messages(key)
    messages = {
      50 => 'Missing  Type  of  User',
      51 => 'Missing  Email Address',
      52 => 'Missing  First Name',
      53 => 'Missing  Last  Name',
      55 => 'Invalid  Salutation',
      56 => 'First  Name  too long',
      57 => 'Last Name  too long',
      58 => 'Middle Name  too long',
      59 => 'Suffix too long',
      60 => 'Invalid  email formatting',
      61 => 'Duplicate  email. Email already in  use on  the system.',
      62 => 'Internal notes exceed  field.',
      63 => 'Address1 too long',
      64 => 'Address2 too long',
      65 => 'City too long',
      66 => 'State  / Province code does not exist in ISO 2 character code or is otherwise invalid',
      67 => 'Zip  / Postal code contains punctuation',
      68 => 'Zip  / Postal code too long',
      69 => 'Country code does not exist in ISO 2 character code or is  otherwise invalid',
      70 => 'Country is missing',
      71 => 'Province is too long',
      72 => 'Company  is too long',
      73 => 'Job  Title is too long',
      74 => 'Home Phone is too long',
      75 => 'Cell Phone is too long',
      76 => 'Work Phone is too long',
      77 => 'Fax is too long',
      80 => "Invalid Action:  The 'action'  value is  not valid",
      81 => 'Invalid Content type: Request did not send the content as applications/json',
      83 => 'Invalid Input, the body of the request was malformed, usually indicates bad json',
      84 => 'Passwords  are not  long  enough (6 characters  and combination of letters and numbers)',
      85 => 'Password / Confirm Password  are not  the same'
    }
    { error: key, errorMessage: messages[key.to_i] }
  end

  def remove_params(params)
    valid_fields = ['fname', 'lname', 'guid', 'passwd', 'uname','email']
    params.delete_if do |k, v|
      !valid_fields.include? k
    end
  end
end
