import CustomTitle from "@/components/global/CustomTitle";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { Button, Icon, ListItem } from "@rneui/base";
import { useState } from "react";
import AdditionalInfoDescription from "../AdditionalInfoDescription";

interface AdditionalInfoListProps {
   additionalInfo: IAdditionalInfo[];
}

export default function AdditionalInfoList({
   additionalInfo,
}: AdditionalInfoListProps) {
   const [expanded, setExpanded] = useState(false);

   return (
      <ListItem.Accordion
         content={
            <>
               <ListItem.Content>
                  <ListItem.Title>
                     <CustomTitle title={"Additional Info"} />
                  </ListItem.Title>
               </ListItem.Content>
               <Button radius={"sm"} type="solid" color={"black"}>
                  <Icon name="edit" color="white" />
               </Button>
            </>
         }
         isExpanded={expanded}
         onPress={() => {
            setExpanded(!expanded);
         }}
      >
         {additionalInfo.map((info) => (
            <ListItem key={info.name} bottomDivider>
               <ListItem.Content>
                  <AdditionalInfoDescription
                     name={info.name}
                     value={info.value}
                  />
               </ListItem.Content>
               <Button radius={"sm"} type="solid" color={"red"}>
                  <Icon name="delete" color="white" />
               </Button>
               <ListItem.Chevron />
            </ListItem>
         ))}
      </ListItem.Accordion>
   );
}
