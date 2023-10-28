Feature: enable disable prompt
	I can better manage my project

	Scenario: a disabled prompt dosen't appear to story recorders
		Given I disable a story prompt
		When a participant scrolls throught the list of available story prompts
		Then the prompt I disabled will not appear in the list

		
