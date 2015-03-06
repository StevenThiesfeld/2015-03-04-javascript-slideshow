class Slide
  
  attr_reader :id
  attr_accessor :title, :body, :position
  
  def initialize(options)
    @id = options["id"]
    @title = options["title"]
    @body = options["body"]
    @position = options["position"]
  end
  
  def self.count_slides
    DATABASE.execute("SELECT COUNT(*) FROM slides")[0][0]
  end
  
  def to_hash
    {
      id: id,
      title: title,
      body: body,
      position: position
    }
  end
  
  def self.get_next_slide(currentPosition)
    if currentPosition.to_i != 5
      result = DATABASE.execute("SELECT * FROM slides WHERE position = #{currentPosition.to_i + 1}")[0]
    else
      result = DATABASE.execute("SELECT * FROM slides WHERE position = 1")[0]
    end
    self.new(result)
  end
  
  def self.get_previous_slide(currentPosition)
    if currentPosition.to_i != 1
      result = DATABASE.execute("SELECT * FROM slides WHERE position = #{currentPosition.to_i - 1}")[0]
    else
      result = DATABASE.execute("SELECT * FROM slides WHERE position = #{count_slides}")[0]
    end
    self.new(result)
  end
  
  def insert
    DATABASE.execute("INSERT INTO slides (title, body, position) VALUES 
    (?, ?, ?", title, body, position)
    @id =  DATABASE.last_insert_row_id
  end
  
  def delete
    DATABASE.execute("DELETE FROM slides WHERE id = #{id}")
  end
  
  def edit(params)
    params.each do |field, value|
      thaw_field = field.dup.insert(0, "@")
      self.instance_variable_set(thaw_field, value) if value != ""
    end
    self
  end
  
  def save
    attributes = []

    # Example  [:@serial_number, :@name, :@description]
    instance_variables.each do |i|
      # Example  :@name
      attributes << i.to_s.delete("@") # "name"
    end
  
    query_hash = {}

    attributes.each do |a|
      value = self.send(a)
      query_hash[a] = value
    end
    
    query_hash.each do |key, value|
      DATABASE.execute("UPDATE slides SET #{key} = ? WHERE id = #{id}", value )
    end
    self
  end
  
  def self.all
    results = DATABASE.execute("SELECT * FROM slides")
    
    results.map { |row_hash| self.new(row_hash) }
  end
  
  def self.find(s_id)
    result = DATABASE.execute("SELECT * FROM slides WHERE id = #{s_id}")[0]
    
    self.new(result)
  end
  
end#class end