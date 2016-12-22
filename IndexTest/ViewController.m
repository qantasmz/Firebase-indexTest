#import "ViewController.h"
@import Firebase;
@import FirebaseDatabase;

@interface ViewController ()

@end

@implementation ViewController{
    FIRDatabaseReference *rootRef;
    NSDate *startDate;
    NSDate *endDate;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    rootRef= [[FIRDatabase database] reference];
    // Do any additional setup after loading the view, typically from a nib.
    FIRDatabaseReference *objects = [rootRef child: @"Objects"];
    
    startDate = [NSDate date];
    
    [[[objects queryOrderedByChild:@"num"] queryLimitedToFirst:500] observeSingleEventOfType:FIRDataEventTypeValue withBlock:^(FIRDataSnapshot *snapshot){
        
        endDate = [NSDate date];
        NSTimeInterval interval = [endDate timeIntervalSinceDate:startDate];
        NSLog([NSString stringWithFormat:@"処理時間 : ミリ秒 : %f",interval]);
        //データの中身を確認する場合、下記を実行
        /*
        for (FIRDataSnapshot* childSnap in snapshot.children) {
            NSLog(@"%@", childSnap.value[@"name"]);
            NSLog(@"%@", childSnap.value[@"num"]);
        }
        */
    }withCancelBlock:^(NSError *error){
    }];
    
}

- (NSString*)getDateString:(NSDate*)date
{
    NSDateFormatter *dateFormatter = [NSDateFormatter new];
    [dateFormatter setDateFormat:@"yyyy/MM/dd HH:mm:ss.SSS"];
    NSString *dateString = [dateFormatter stringFromDate:date];
    return dateString;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}


@end
