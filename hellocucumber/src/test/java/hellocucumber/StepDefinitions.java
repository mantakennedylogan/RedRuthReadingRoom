package hellocucumber;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import static org.junit.jupiter.api.Assertions.*;
// nothing works becasue no classes are defined

public class StepDefinitions {
	private prompt userPrompt;
	private prompt[] visiblePrompts;
	private boolean isEnabled;

	@Given("I disable a story prompt")
	public void i_disable_a_story_prompt() {
		userPrompt.enabled = false;
	}
	@When("a participant scrolls throught the list of available story prompts")
	public void a_participant_scrolls_throught_the_list_of_available_story_prompts(){ 
		isEnabled = visiblePrompts.exists(userPrompt);
	}
	@Then("the prompt I disabled will not appear in the list")
	public void the_prompt_i_disabled_will_not_appear_in_the_list() {
		assertEquals(isEnabled, false);
	} 
}

