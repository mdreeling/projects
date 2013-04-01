//
//  ItineraryBasicDetailViewController.m
//  ExpBuddyNav
//
//  Created by Neo Matrix on 22/03/2009.
//  Copyright 2009 None. All rights reserved.
//

#import "ItineraryBasicDetailViewController.h"
#import "NavAppDelegate.h"

@implementation ItineraryBasicDetailViewController

@synthesize itn;
@synthesize fieldLabels;
@synthesize tempValues;
@synthesize textFieldBeingEdited;
#pragma mark -
-(IBAction)cancel:(id)sender{
	
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	[delegate.navController popViewControllerAnimated:YES];
	
}
- (IBAction)save:(id)sender
{
	
	if (textFieldBeingEdited != nil)
	{
		NSNumber *tfKey= [[NSNumber alloc] initWithInt:textFieldBeingEdited.tag];
		[tempValues setObject:textFieldBeingEdited.text forKey:tfKey];
		[tfKey release];
		
	}
	for (NSNumber *key in [tempValues allKeys])
	{
		switch ([key intValue]) {
			case kNameRowIndex:
				itn.itnId = [tempValues objectForKey:key];
				break;
			case kFromYearRowIndex:
				itn.airlineTicketNum = [tempValues objectForKey:key];
				break;
			case kToYearRowIndex:
				itn.itnId = [tempValues objectForKey:key];
				break;
			case kPartyIndex:
				itn.itnId = [tempValues objectForKey:key];
			default:
				break;
		}
	}
	
	// Have parent view reload its data
	NavAppDelegate *delegate = [[UIApplication sharedApplication] delegate];
	
	UINavigationController *navController = [delegate navController];
	[navController popViewControllerAnimated:YES];
	
	NSArray *allControllers = navController.viewControllers;
	UITableViewController *parent = [allControllers lastObject];
	[parent.tableView reloadData];	
}
-(IBAction)textFieldDone:(id)sender
{
	UITableViewCell *cell = (UITableViewCell *)[[(UIView *)sender superview] superview];
	UITableView *table = (UITableView *)[cell superview];
	NSIndexPath *textFieldIndexPath = [table indexPathForCell:cell];
	NSUInteger row = [textFieldIndexPath row];
	row++;
	if (row >= kNumberOfEditableRows)
		row = 0;
	NSUInteger newIndex[] = {0, row};
	NSIndexPath *newPath = [[NSIndexPath alloc] initWithIndexes:newIndex length:2];
	UITableViewCell *nextCell = [self.tableView cellForRowAtIndexPath:newPath];
	UITextField *nextField = nil;
	for (UIView *oneView in nextCell.contentView.subviews)
	{
		if ([oneView isMemberOfClass:[UITextField class]])
			nextField = (UITextField *)oneView;
	}
	[nextField becomeFirstResponder];
	
}
#pragma mark -

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
	if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
		// Initialization code
	}
	return self;
}

- (void)viewDidLoad {
	
	NSArray *array = [[NSArray alloc] initWithObjects:@"Id:", @"Airline Ticket:", @"Checkout:", @"Desc:", nil];
	self.fieldLabels = array;
	[array release];
	
	UIBarButtonItem *cancelButton = [[UIBarButtonItem alloc]
									 initWithTitle:@"Cancel"
									 style:UIBarButtonItemStylePlain
									 target:self
									 action:@selector(cancel:)];
	self.navigationItem.leftBarButtonItem = cancelButton;
	[cancelButton release];
	
	UIBarButtonItem *saveButton = [[UIBarButtonItem alloc]
								   initWithTitle:@"Save" 
								   style:UIBarButtonItemStyleDone
								   target:self
								   action:@selector(save:)];
	self.navigationItem.rightBarButtonItem = saveButton;
	[saveButton release];
	
	NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
	self.tempValues = dict;
	[dict release];
	[super viewDidLoad];
}


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
	// Return YES for supported orientations
	return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning {
	[super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
	// Release anything that's not essential, such as cached data
}


- (void)dealloc {
	[textFieldBeingEdited release];
	[tempValues release];
	[itn release];
	[fieldLabels release];
	
	[super dealloc];
}
#pragma mark -
#pragma mark Table Data Source Methods
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	return kNumberOfEditableRows;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
	static NSString *PresidentCellIdentifier = @"PresidentCellIdentifier";
	
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:PresidentCellIdentifier];
	if (cell == nil) {
		
		cell = [[[UITableViewCell alloc] initWithFrame:CGRectZero 
									   reuseIdentifier:PresidentCellIdentifier] autorelease];
		UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(10, 10, 75, 25)];
		label.textAlignment = UITextAlignmentRight;
		label.tag = kLabelTag;
		label.font = [UIFont boldSystemFontOfSize:14];
		[cell.contentView addSubview:label];
		[label release];
		
		
		UITextField *textField = [[UITextField alloc] initWithFrame:CGRectMake(90, 12, 200, 25)];
		textField.clearsOnBeginEditing = NO;
		[textField setDelegate:self];
		//textField.returnKeyType = UIReturnKeyDone;
		[textField addTarget:self 
					  action:@selector(textFieldDone:) 
			forControlEvents:UIControlEventEditingDidEndOnExit];
		[cell.contentView addSubview:textField];	
		
		
	}
	NSUInteger row = [indexPath row];
	
	UILabel *label = (UILabel *)[cell viewWithTag:kLabelTag];
	UITextField *textField = nil;
	for (UIView *oneView in cell.contentView.subviews)
	{
		if ([oneView isMemberOfClass:[UITextField class]])
			textField = (UITextField *)oneView;
	}
	
	label.text = [fieldLabels objectAtIndex:row];
	NSNumber *rowAsNum = [[NSNumber alloc] initWithInt:row];
	switch (row) {
		case kNameRowIndex:
			if ([[tempValues allKeys] containsObject:rowAsNum])
				textField.text = [tempValues objectForKey:rowAsNum];
			else
				textField.text = itn.itnId;
			break;
		case kFromYearRowIndex:
			if ([[tempValues allKeys] containsObject:rowAsNum])
				textField.text = [tempValues objectForKey:rowAsNum];
			else
				textField.text = itn.airlineTicketNum;
			break;
		case kToYearRowIndex:
			if ([[tempValues allKeys] containsObject:rowAsNum])
				textField.text = [tempValues objectForKey:rowAsNum];
			else
				textField.text = itn.itnId;
			break;
		case kPartyIndex:
			if ([[tempValues allKeys] containsObject:rowAsNum])
				textField.text = [tempValues objectForKey:rowAsNum];
			else
				textField.text = itn.itnId;
		default:
			break;
	}
	if (textFieldBeingEdited == textField)
		textFieldBeingEdited = nil;
	
	textField.tag = row;
	[rowAsNum release];
	return cell;
}
#pragma mark -
#pragma mark Table Delegate Methods
- (NSIndexPath *)tableView:(UITableView *)tableView 
  willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
	return nil;
}
#pragma mark Text Field Delegate Methods
- (void)textFieldDidBeginEditing:(UITextField *)textField
{
	self.textFieldBeingEdited = textField;
}
- (void)textFieldDidEndEditing:(UITextField *)textField
{
	NSNumber *tagAsNum = [[NSNumber alloc] initWithInt:textField.tag];
	[tempValues setObject:textField.text forKey:tagAsNum];
	[tagAsNum release];		
}

@end
