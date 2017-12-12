class Risk:
	"Risk"

	def __init__(self, code, riskName):
		"""Constructor"""
		self.code = code
		self.riskName = riskName

class FieldType:
	"FieldType, here should be configured the types: text, enum, number, etc"

	def __init__(self, fieldTypeId, name):
		"""Constructor"""
		self.fieldTypeId = fieldTypeId
		self.name = name

class RiskField:
	"RiskField"

	def __init__(self, riskCode, riskFieldId, riskType):
		"""Constructor"""
        # This should be a reference of Risk
		self.riskCode = riskCode
		self.riskFieldId = riskFieldId
        # This should be a reference of FieldType, it must be a list
		self.riskType = riskType

class RiskFieldOption:
	"RiskFieldOption"

	def __init__(self, riskFieldOptionId, riskFieldId, value):
		"""Constructor"""
		self.riskFieldOptionId = riskFieldOptionId
        # This should be a reference of RiskField
		self.riskFieldId = riskFieldId
		self.value = value
